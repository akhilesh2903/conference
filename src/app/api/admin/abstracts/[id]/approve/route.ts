import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import AbstractSubmission from '@/models/AbstractSubmission';
import EmailLog from '@/models/EmailLog';
import { checkAdminAuth } from '@/lib/adminAuth';
import { sendApprovalEmail } from '@/lib/emailService';

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

    // Duplicate prevention: If already Approved and email was sent successfully, do not resend
    if (abstract.status === 'Approved' && abstract.emailNotification?.status === 'sent') {
      return NextResponse.json(
        {
          error: 'This abstract is already Approved and the acceptance email has already been delivered.',
          alreadyProcessed: true,
          abstract,
        },
        { status: 400 }
      );
    }

    // Determine recipient details
    const recipientEmail = abstract.primaryAuthor?.email || abstract.userEmail;
    const recipientName = abstract.primaryAuthor?.name || 'Author';

    if (!recipientEmail) {
      return NextResponse.json(
        { error: 'Cannot send approval email: No registered author email address found for this abstract.' },
        { status: 400 }
      );
    }

    // Update status to Approved
    abstract.status = 'Approved';
    abstract.decisionDate = new Date();
    abstract.decisionBy = auth.username || 'admin';
    abstract.rejectionReason = ''; // Clear rejection reason if previously set

    // Attempt to send email
    const emailResult = await sendApprovalEmail({
      participantName: recipientName,
      participantEmail: recipientEmail,
      abstractTitle: abstract.title,
      submissionId: abstract.submissionId,
      track: abstract.track,
    });

    const currentAttempts = (abstract.emailNotification?.attempts || 0) + 1;

    if (emailResult.success) {
      abstract.emailNotification = {
        status: 'sent',
        notificationType: 'approval',
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
        notificationType: 'approval' as const,
        status: 'sent' as const,
        sentAt: new Date(),
        messageId: emailResult.messageId || '',
        sentBy: auth.username || 'admin',
      };

      if (!abstract.emailLogs) abstract.emailLogs = [];
      abstract.emailLogs.push(logEntry);

      await EmailLog.create({
        submissionId: abstract.submissionId,
        recipientEmail,
        recipientName,
        abstractTitle: abstract.title,
        notificationType: 'approval',
        status: 'sent',
        messageId: emailResult.messageId || '',
        sentBy: auth.username || 'admin',
        sentAt: new Date(),
      }).catch((e: unknown) => console.error('Error logging to EmailLog collection:', e));

      await abstract.save();

      return NextResponse.json({
        success: true,
        emailSent: true,
        message: 'Abstract successfully approved and acceptance email sent to author.',
        abstract,
      });
    } else {
      // SMTP operation failed
      abstract.emailNotification = {
        status: 'failed',
        notificationType: 'approval',
        recipientEmail,
        error: emailResult.error || 'SMTP delivery failed.',
        attempts: currentAttempts,
        lastAttemptAt: new Date(),
        messageId: '',
      };

      const logEntry = {
        recipientEmail,
        recipientName,
        notificationType: 'approval' as const,
        status: 'failed' as const,
        sentAt: new Date(),
        error: emailResult.error || 'SMTP delivery failed.',
        sentBy: auth.username || 'admin',
      };

      if (!abstract.emailLogs) abstract.emailLogs = [];
      abstract.emailLogs.push(logEntry);

      await EmailLog.create({
        submissionId: abstract.submissionId,
        recipientEmail,
        recipientName,
        abstractTitle: abstract.title,
        notificationType: 'approval',
        status: 'failed',
        error: emailResult.error || 'SMTP delivery failed.',
        sentBy: auth.username || 'admin',
        sentAt: new Date(),
      }).catch((e: unknown) => console.error('Error logging to EmailLog collection:', e));

      await abstract.save();

      return NextResponse.json(
        {
          success: true,
          emailSent: false,
          warning: true,
          message: `Abstract status updated to Approved, but email delivery failed: ${emailResult.error}. You can retry sending the email notification.`,
          emailError: emailResult.error,
          abstract,
        },
        { status: 200 }
      );
    }
  } catch (error: unknown) {
    console.error('Approve abstract error:', error);
    const errorMsg = error instanceof Error ? error.message : 'Failed to process abstract approval.';
    return NextResponse.json(
      { error: errorMsg },
      { status: 500 }
    );
  }
}

