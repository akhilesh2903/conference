import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AbstractSubmission from '@/models/AbstractSubmission';
import EmailLog from '@/models/EmailLog';
import { checkAdminAuth } from '@/lib/adminAuth';
import { sendApprovalEmail, sendRejectionEmail } from '@/lib/emailService';

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const auth = checkAdminAuth(request);
  if (!auth.authorized) {
    return NextResponse.json({ error: 'Unauthorized: Admin access required.' }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await connectToDatabase();

    const abstract = await AbstractSubmission.findById(id);
    if (!abstract) {
      return NextResponse.json({ error: 'Abstract submission not found.' }, { status: 404 });
    }

    const recipientEmail = abstract.primaryAuthor?.email || abstract.userEmail;
    const recipientName = abstract.primaryAuthor?.name || 'Author';

    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'Cannot send email: No registered author email address found for this abstract.' },
        { status: 400 }
      );
    }

    const isApproval = abstract.status === 'Approved' || abstract.status === 'Accepted';
    const isRejection = abstract.status === 'Rejected';

    if (!isApproval && !isRejection) {
      return NextResponse.json(
        { error: `Cannot send decision email: Abstract current status is "${abstract.status}". Only Approved or Rejected abstracts have decision emails.` },
        { status: 400 }
      );
    }

    const notificationType: 'approval' | 'rejection' = isApproval ? 'approval' : 'rejection';
    const currentAttempts = (abstract.emailNotification?.attempts || 0) + 1;

    let emailResult;
    if (isApproval) {
      emailResult = await sendApprovalEmail({
        participantName: recipientName,
        participantEmail: recipientEmail,
        abstractTitle: abstract.title,
        submissionId: abstract.submissionId,
        track: abstract.track,
      });
    } else {
      emailResult = await sendRejectionEmail({
        participantName: recipientName,
        participantEmail: recipientEmail,
        abstractTitle: abstract.title,
        submissionId: abstract.submissionId,
        rejectionReason: abstract.rejectionReason,
      });
    }

    if (emailResult.success) {
      abstract.emailNotification = {
        status: 'sent',
        notificationType,
        sentAt: new Date(),
        recipientEmail,
        attempts: currentAttempts,
        lastAttemptAt: new Date(),
        messageId: emailResult.messageId || '',
        error: '',
      };

      const logEntry = {
        recipientEmail,
        recipientName,
        notificationType,
        status: 'sent' as const,
        sentAt: new Date(),
        messageId: emailResult.messageId || '',
        sentBy: `${auth.username || 'admin'} (retry)`,
      };

      if (!abstract.emailLogs) abstract.emailLogs = [];
      abstract.emailLogs.push(logEntry);

      await EmailLog.create({
        submissionId: abstract.submissionId,
        recipientEmail,
        recipientName,
        abstractTitle: abstract.title,
        notificationType,
        status: 'sent',
        messageId: emailResult.messageId || '',
        sentBy: `${auth.username || 'admin'} (retry)`,
        sentAt: new Date(),
      }).catch((e: unknown) => console.error('Error logging to EmailLog collection:', e));

      await abstract.save();

      return NextResponse.json({
        success: true,
        emailSent: true,
        message: `Notification email successfully re-sent to ${recipientEmail}.`,
        abstract,
      });
    } else {
      abstract.emailNotification = {
        status: 'failed',
        notificationType,
        recipientEmail,
        error: emailResult.error || 'SMTP delivery failed.',
        attempts: currentAttempts,
        lastAttemptAt: new Date(),
        messageId: '',
      };

      const logEntry = {
        recipientEmail,
        recipientName,
        notificationType,
        status: 'failed' as const,
        sentAt: new Date(),
        error: emailResult.error || 'SMTP delivery failed.',
        sentBy: `${auth.username || 'admin'} (retry)`,
      };

      if (!abstract.emailLogs) abstract.emailLogs = [];
      abstract.emailLogs.push(logEntry);

      await EmailLog.create({
        submissionId: abstract.submissionId,
        recipientEmail,
        recipientName,
        abstractTitle: abstract.title,
        notificationType,
        status: 'failed',
        error: emailResult.error || 'SMTP delivery failed.',
        sentBy: `${auth.username || 'admin'} (retry)`,
        sentAt: new Date(),
      }).catch((e: unknown) => console.error('Error logging to EmailLog collection:', e));

      await abstract.save();

      return NextResponse.json(
        {
          success: false,
          emailSent: false,
          error: `Retry email delivery failed: ${emailResult.error}`,
          emailError: emailResult.error,
          abstract,
        },
        { status: 500 }
      );
    }
  } catch (error: unknown) {
    console.error('Resend email error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to resend notification email.';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

