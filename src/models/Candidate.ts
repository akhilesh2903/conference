import mongoose, { Schema, model, models } from 'mongoose';

export interface ICandidate {
  fullName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  phoneNumber: string;
  institution: string;
  country?: string;
  city?: string;
  state?: string;
  category: string;
  presentationType: string;
  paperId?: string;
  paymentReference?: string;
  googleScholarId?: string;
  orcidId?: string;
  semanticScholarId?: string;
  dblpId?: string;
  openReviewId?: string;
  domainConflicts?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

const CandidateSchema = new Schema<ICandidate>({
  fullName: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  phoneNumber: { type: String, required: true },
  institution: { type: String, required: true },
  country: { type: String, default: 'India' },
  city: { type: String },
  state: { type: String },
  category: { type: String, required: true },
  presentationType: { type: String, default: 'Oral Presenter' },
  paperId: { type: String, required: false },
  paymentReference: { type: String, required: false },
  googleScholarId: { type: String },
  orcidId: { type: String },
  semanticScholarId: { type: String },
  dblpId: { type: String },
  openReviewId: { type: String },
  domainConflicts: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

const Candidate = models.Candidate || model<ICandidate>('Candidate', CandidateSchema);

export default Candidate;
