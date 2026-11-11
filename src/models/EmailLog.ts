import { Schema, model, models } from 'mongoose';

export interface IEmailLog {
  _id?: string;
  submissionId: string;
  recipientEmail: string;
  recipientName: string;
  abstractTitle: string;
  notificationType: 'approval' | 'rejection';
  status: 'sent' | 'failed';
  error?: string;
  messageId?: string;
  sentBy: string;
  sentAt: Date;
}

const EmailLogSchema = new Schema<IEmailLog>({
  submissionId: { type: String, required: true, index: true },
  recipientEmail: { type: String, required: true, index: true },
  recipientName: { type: String, default: '' },
  abstractTitle: { type: String, default: '' },
  notificationType: { type: String, enum: ['approval', 'rejection'], required: true },
  status: { type: String, enum: ['sent', 'failed'], required: true },
  error: { type: String, default: '' },
  messageId: { type: String, default: '' },
  sentBy: { type: String, default: 'admin' },
  sentAt: { type: Date, default: Date.now },
});

const EmailLog = models.EmailLog || model<IEmailLog>('EmailLog', EmailLogSchema);

export default EmailLog;

