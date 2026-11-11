import { Schema, model, models } from 'mongoose';

export interface ICoAuthor {
  name: string;
  email: string;
  organization: string;
  country: string;
}

export interface IEmailLogEntry {
  recipientEmail: string;
  recipientName?: string;
  notificationType: 'approval' | 'rejection';
  status: 'sent' | 'failed';
  sentAt: Date;
  error?: string;
  messageId?: string;
  sentBy?: string;
}

export interface IAbstractSubmission {
  _id?: string;
  submissionId: string;
  track: string;
  secondaryTrack?: string;
  title: string;
  abstract: string;
  keywords: string;
  userEmail: string;
  primaryAuthor: {
    name: string;
    email: string;
    organization: string;
    country: string;
  };
  coAuthors: ICoAuthor[];
  domainConflicts?: string;
  wordCount: number;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Submitted' | 'Under Review' | 'Accepted' | 'Revision';
  rejectionReason?: string;
  decisionDate?: Date;
  decisionBy?: string;
  emailNotification?: {
    status: 'not_sent' | 'sent' | 'failed';
    notificationType?: 'approval' | 'rejection';
    sentAt?: Date;
    recipientEmail?: string;
    error?: string;
    attempts?: number;
    lastAttemptAt?: Date;
    messageId?: string;
  };
  emailLogs?: IEmailLogEntry[];
  createdAt: Date;
}

const CoAuthorSchema = new Schema<ICoAuthor>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String, required: true },
  country: { type: String, required: true },
}, { _id: false });

const EmailLogEntrySchema = new Schema<IEmailLogEntry>({
  recipientEmail: { type: String, required: true },
  recipientName: { type: String, default: '' },
  notificationType: { type: String, enum: ['approval', 'rejection'], required: true },
  status: { type: String, enum: ['sent', 'failed'], required: true },
  sentAt: { type: Date, default: Date.now },
  error: { type: String, default: '' },
  messageId: { type: String, default: '' },
  sentBy: { type: String, default: 'admin' },
}, { _id: false });

const AbstractSubmissionSchema = new Schema<IAbstractSubmission>({
  submissionId: { type: String, required: true, unique: true },
  track: { type: String, required: true },
  secondaryTrack: { type: String, default: '' },
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  keywords: { type: String, required: true },
  userEmail: { type: String, required: true },
  primaryAuthor: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    organization: { type: String, required: true },
    country: { type: String, required: true },
  },
  coAuthors: [CoAuthorSchema],
  domainConflicts: { type: String, default: '' },
  wordCount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Approved', 'Rejected', 'Submitted', 'Under Review', 'Accepted', 'Revision'],
    default: 'Pending' 
  },
  rejectionReason: { type: String, default: '' },
  decisionDate: { type: Date },
  decisionBy: { type: String, default: '' },
  emailNotification: {
    status: { type: String, enum: ['not_sent', 'sent', 'failed'], default: 'not_sent' },
    notificationType: { type: String, enum: ['approval', 'rejection'] },
    sentAt: { type: Date },
    recipientEmail: { type: String },
    error: { type: String, default: '' },
    attempts: { type: Number, default: 0 },
    lastAttemptAt: { type: Date },
    messageId: { type: String, default: '' },
  },
  emailLogs: [EmailLogEntrySchema],
  createdAt: { type: Date, default: Date.now },
});

const AbstractSubmission = models.AbstractSubmission || model<IAbstractSubmission>('AbstractSubmission', AbstractSubmissionSchema);

export default AbstractSubmission;
