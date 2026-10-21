import mongoose, { Schema, model, models } from 'mongoose';

export interface ICmtUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization: string;
  country: string;
  city?: string;
  phoneNumber?: string;
  googleScholarId?: string;
  semanticScholarId?: string;
  dblpId?: string;
  orcidId?: string;
  openReviewId?: string;
  domainConflicts?: string;
  createdAt: Date;
}

const CmtUserSchema = new Schema<ICmtUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  organization: { type: String, required: true, trim: true },
  country: { type: String, required: true },
  city: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  googleScholarId: { type: String, default: '' },
  semanticScholarId: { type: String, default: '' },
  dblpId: { type: String, default: '' },
  orcidId: { type: String, default: '' },
  openReviewId: { type: String, default: '' },
  domainConflicts: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

const CmtUser = models.CmtUser || model<ICmtUser>('CmtUser', CmtUserSchema);

export default CmtUser;
