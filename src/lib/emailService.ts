import nodemailer from 'nodemailer';

export interface EmailRecipientInfo {
  participantName: string;
  participantEmail: string;
  abstractTitle: string;
  submissionId: string;
  track?: string;
  rejectionReason?: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

const CONFERENCE_NAME = process.env.CONFERENCE_NAME || 'ICMEMS 2027';
const CONFERENCE_FULL_TITLE = 'International Conference on Materials, Energy and Management for Sustainability (ICMEMS 2027)';
const CONFERENCE_ORGANIZER = "Alva's Institute of Engineering & Technology (AIET), Moodbidri, Karnataka, India";
const CONFERENCE_WEBSITE = process.env.CONFERENCE_WEBSITE || process.env.NEXT_PUBLIC_BASE_URL || 'https://aiet.org.in/icmems2027';
const CONFERENCE_EMAIL = process.env.CONFERENCE_EMAIL || 'icmems2027@gmail.com';

/**
 * Creates and returns the Nodemailer transporter instance.
 * Throws a descriptive error if SMTP credentials are missing.
 */
export function getMailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error(
      'SMTP credentials are not configured. Please define SMTP_USER and SMTP_PASS (e.g. Gmail App Password) or an HTTP email API key (RESEND_API_KEY / BREVO_API_KEY).'
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
    connectionTimeout: 10000,
    greetingTimeout: 8000,
    socketTimeout: 15000,
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production',
    },
  });
}

/**
 * Returns a properly sanitized sender email header.
 */
export function getSenderAddress(): string {
  const rawFrom = process.env.SMTP_FROM?.trim();
  if (rawFrom && rawFrom.includes('@')) {
    // Strip accidental wrapper quotes, e.g. '"ICMEMS 2027" <email>'
    const cleaned = rawFrom.replace(/^["'](.*)["']$/, '$1').trim();
    if (cleaned) return cleaned;
  }
  const name = process.env.CONFERENCE_NAME || 'ICMEMS 2027 Organizing Committee';
  const email = process.env.SMTP_USER || 'icmems2027@gmail.com';
  return `"${name}" <${email}>`;
}

/**
 * Dispatches an email using the best available transport:
 * 1. Resend HTTP REST API (if RESEND_API_KEY is configured — works on Render Free Tier via HTTPS 443)
 * 2. Brevo HTTP REST API (if BREVO_API_KEY is configured — works on Render Free Tier via HTTPS 443)
 * 3. Standard SMTP via Nodemailer (if SMTP_USER and SMTP_PASS are configured)
 */
async function dispatchEmail(params: {
  recipientName: string;
  recipientEmail: string;
  subject: string;
  htmlContent: string;
  plainTextContent: string;
  preheader: string;
}): Promise<EmailSendResult> {
  const { recipientName, recipientEmail, subject, htmlContent, plainTextContent, preheader } = params;

  // 1. Check for Resend HTTPS API (bypasses Render port blocks)
  if (process.env.RESEND_API_KEY) {
    try {
      const from = process.env.RESEND_FROM || getSenderAddress();
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY.trim()}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from,
          to: [recipientEmail],
          subject,
          html: wrapEmailHtml(htmlContent, preheader),
          text: plainTextContent,
        }),
      });

      const data = (await res.json()) as { id?: string; message?: string };
      if (!res.ok) {
        throw new Error(data.message || `Resend API rejected request (${res.status})`);
      }

      return {
        success: true,
        messageId: data.id || `resend-${Date.now()}`,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Resend HTTP API error';
      console.error('[EmailService] Resend API error:', err);
      return { success: false, error: msg };
    }
  }

  // 2. Check for Brevo HTTPS API (bypasses Render port blocks)
  if (process.env.BREVO_API_KEY) {
    try {
      const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER || '4al23is006@gmail.com';
      const senderName = process.env.BREVO_SENDER_NAME || process.env.CONFERENCE_NAME || 'ICMEMS 2027 Organizing Committee';
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'api-key': process.env.BREVO_API_KEY.trim(),
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: recipientEmail, name: recipientName }],
          subject,
          htmlContent: wrapEmailHtml(htmlContent, preheader),
          textContent: plainTextContent,
        }),
      });

      const data = (await res.json()) as { messageId?: string; message?: string };
      if (!res.ok) {
        throw new Error(data.message || `Brevo API rejected request (${res.status})`);
      }

      return {
        success: true,
        messageId: data.messageId || `brevo-${Date.now()}`,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Brevo HTTP API error';
      console.error('[EmailService] Brevo API error:', err);
      return { success: false, error: msg };
    }
  }

  // 3. Fallback: SMTP via Nodemailer
  try {
    const transporter = getMailTransporter();
    const fromAddress = getSenderAddress();

    const mailOptions = {
      from: fromAddress,
      to: recipientEmail,
      subject,
      text: plainTextContent,
      html: wrapEmailHtml(htmlContent, preheader),
    };

    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: unknown) {
    let errorMsg = error instanceof Error ? error.message : 'Failed to send email via SMTP transporter.';
    if (
      errorMsg.toLowerCase().includes('timeout') ||
      errorMsg.includes('ETIMEDOUT') ||
      errorMsg.includes('ESOCKETTIMEDOUT') ||
      errorMsg.includes('ECONNREFUSED')
    ) {
      errorMsg =
        'SMTP Connection timeout. Render Free Tier blocks outbound SMTP traffic on ports 25, 465, and 587. To send emails from Render, add RESEND_API_KEY or BREVO_API_KEY to your Render environment variables (both operate over HTTPS port 443), or upgrade Render to a paid plan.';
    }
    console.error(`[EmailService] Failed to send email to ${recipientEmail}:`, error);
    return {
      success: false,
      error: errorMsg,
    };
  }
}

/**
 * Generates responsive HTML wrapper for conference emails
 */
function wrapEmailHtml(content: string, preheader: string = ''): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${CONFERENCE_NAME}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
    table { border-collapse: collapse; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #0a192f 0%, #134e4a 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
    .badge { display: inline-block; background-color: rgba(45, 212, 191, 0.2); border: 1px solid rgba(45, 212, 191, 0.4); color: #2dd4bf; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
    .title { font-size: 22px; font-weight: 800; margin: 0 0 6px 0; color: #ffffff; letter-spacing: -0.02em; }
    .subtitle { font-size: 13px; color: #cbd5e1; margin: 0; line-height: 1.4; }
    .body-content { padding: 32px 28px; color: #334155; font-size: 14px; line-height: 1.7; }
    .highlight-card { background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 24px 0; }
    .card-row { margin-bottom: 10px; font-size: 13px; }
    .card-row:last-child { margin-bottom: 0; }
    .card-label { font-weight: 600; color: #64748b; display: inline-block; width: 130px; }
    .card-value { font-weight: 700; color: #0f172a; }
    .status-badge { display: inline-block; padding: 3px 10px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .status-approved { background-color: #dcfce7; color: #166534; border: 1px solid #86efac; }
    .status-rejected { background-color: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; }
    .reason-box { background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 14px 18px; margin: 20px 0; border-radius: 4px; color: #881337; font-size: 13px; line-height: 1.6; }
    .footer { background-color: #0a192f; color: #94a3b8; padding: 24px 28px; text-align: center; font-size: 12px; line-height: 1.6; border-top: 1px solid #1e293b; }
    .footer a { color: #2dd4bf; text-decoration: none; font-weight: 600; }
  </style>
</head>
<body>
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0;">${preheader}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 30px 10px;">
    <tr>
      <td align="center">
        <div class="container">
          <!-- Header -->
          <div class="header">
            <div class="badge">Official Decision Notification</div>
            <h1 class="title">${CONFERENCE_NAME}</h1>
            <p class="subtitle">${CONFERENCE_FULL_TITLE}</p>
          </div>
          <!-- Body -->
          <div class="body-content">
            ${content}
          </div>
          <!-- Footer -->
          <div class="footer">
            <p style="margin: 0 0 6px 0; color: #ffffff; font-weight: 700;">Conference Organizing Committee</p>
            <p style="margin: 0 0 6px 0;">${CONFERENCE_ORGANIZER}</p>
            <p style="margin: 0;">
              Website: <a href="${CONFERENCE_WEBSITE}">${CONFERENCE_WEBSITE}</a> &nbsp;|&nbsp; 
              Email: <a href="mailto:${CONFERENCE_EMAIL}">${CONFERENCE_EMAIL}</a>
            </p>
          </div>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Send Abstract Approval Email
 */
export async function sendApprovalEmail(info: EmailRecipientInfo): Promise<EmailSendResult> {
  const { participantName, participantEmail, abstractTitle, submissionId, track } = info;

  const subject = 'Congratulations! Your Abstract Has Been Accepted';
  const preheader = `Your abstract "${abstractTitle}" (ID: ${submissionId}) has been successfully accepted for ${CONFERENCE_NAME}.`;

  const htmlContent = `
    <p style="font-size: 15px; margin-top: 0;">Dear <strong>${participantName}</strong>,</p>
    
    <p>
      We are pleased to inform you that your abstract titled <strong>&ldquo;${abstractTitle}&rdquo;</strong> has been successfully reviewed and accepted for the conference.
    </p>

    <div class="highlight-card">
      <div class="card-row">
        <span class="card-label">Submission ID:</span>
        <span class="card-value" style="font-family: monospace; color: #0f766e;">${submissionId}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Paper Title:</span>
        <span class="card-value">${abstractTitle}</span>
      </div>
      ${track ? `
      <div class="card-row">
        <span class="card-label">Conference Track:</span>
        <span class="card-value">${track}</span>
      </div>` : ''}
      <div class="card-row">
        <span class="card-label">Decision Status:</span>
        <span class="status-badge status-approved">Approved</span>
      </div>
    </div>

    <p>
      Congratulations on your acceptance. Further details regarding the conference, presentation schedule, and participation instructions will be communicated through our official website/email.
    </p>

    <p style="margin-bottom: 24px;">
      Thank you for your submission.
    </p>

    <p style="margin-bottom: 0;">
      Best Regards,<br>
      <strong>Conference Organizing Committee</strong><br>
      <span style="color: #64748b; font-size: 13px;">${CONFERENCE_NAME} &bull; AIET Moodbidri</span>
    </p>
  `;

  const plainTextContent = `Dear ${participantName},

We are pleased to inform you that your abstract titled "${abstractTitle}" has been successfully reviewed and accepted for the conference.

Submission ID: ${submissionId}
Conference Track: ${track || 'General'}
Decision Status: Approved

Congratulations on your acceptance. Further details regarding the conference, presentation schedule, and participation instructions will be communicated through our official website/email.

Thank you for your submission.

Best Regards,
Conference Organizing Committee
${CONFERENCE_NAME}
${CONFERENCE_ORGANIZER}
Website: ${CONFERENCE_WEBSITE}
Contact: ${CONFERENCE_EMAIL}
`;

  return await dispatchEmail({
    recipientName: participantName,
    recipientEmail: participantEmail,
    subject,
    htmlContent,
    plainTextContent,
    preheader,
  });
}

/**
 * Send Abstract Rejection Email
 */
export async function sendRejectionEmail(info: EmailRecipientInfo): Promise<EmailSendResult> {
  const { participantName, participantEmail, abstractTitle, submissionId, rejectionReason } = info;

  const subject = 'Update Regarding Your Conference Abstract Submission';
  const preheader = `Review update regarding your conference abstract submission "${abstractTitle}" (ID: ${submissionId}).`;

  const reasonHtml = rejectionReason && rejectionReason.trim()
    ? `<div class="reason-box">
        <strong>Review Committee Feedback:</strong><br>
        ${rejectionReason.trim().replace(/\n/g, '<br>')}
       </div>`
    : '';

  const reasonText = rejectionReason && rejectionReason.trim()
    ? `\nReview Committee Feedback:\n${rejectionReason.trim()}\n`
    : '';

  const htmlContent = `
    <p style="font-size: 15px; margin-top: 0;">Dear <strong>${participantName}</strong>,</p>

    <p>
      Thank you for submitting your abstract titled <strong>&ldquo;${abstractTitle}&rdquo;</strong> to ${CONFERENCE_NAME}.
    </p>

    <p>
      After careful review by our review committee, we regret to inform you that your abstract has not been accepted for the conference.
    </p>

    <div class="highlight-card">
      <div class="card-row">
        <span class="card-label">Submission ID:</span>
        <span class="card-value" style="font-family: monospace; color: #dc2626;">${submissionId}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Paper Title:</span>
        <span class="card-value">${abstractTitle}</span>
      </div>
      <div class="card-row">
        <span class="card-label">Decision Status:</span>
        <span class="status-badge status-rejected">Rejected</span>
      </div>
    </div>

    <p>
      We sincerely appreciate your interest and the time you invested in submitting your work.
    </p>

    ${reasonHtml}

    <p style="margin-bottom: 24px;">
      Thank you for your understanding.
    </p>

    <p style="margin-bottom: 0;">
      Best Regards,<br>
      <strong>Conference Organizing Committee</strong><br>
      <span style="color: #64748b; font-size: 13px;">${CONFERENCE_NAME} &bull; AIET Moodbidri</span>
    </p>
  `;

  const plainTextContent = `Dear ${participantName},

Thank you for submitting your abstract titled "${abstractTitle}" to ${CONFERENCE_NAME}.

After careful review by our review committee, we regret to inform you that your abstract has not been accepted for the conference.

Submission ID: ${submissionId}
Decision Status: Rejected

We sincerely appreciate your interest and the time you invested in submitting your work.
${reasonText}
Thank you for your understanding.

Best Regards,
Conference Organizing Committee
${CONFERENCE_NAME}
${CONFERENCE_ORGANIZER}
Website: ${CONFERENCE_WEBSITE}
Contact: ${CONFERENCE_EMAIL}
`;

  return await dispatchEmail({
    recipientName: participantName,
    recipientEmail: participantEmail,
    subject,
    htmlContent,
    plainTextContent,
    preheader,
  });
}

