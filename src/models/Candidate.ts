import mongoose, { Schema, model, models } from 'mongoose';

export interface ICandidate {
  fullName: string;
  email: string;
  phoneNumber: string;
  institution: string;
  category: string;
  presentationType: string;
  paperId?: string;
  paymentReference?: string;
  createdAt: Date;
}

const CandidateSchema = new Schema<ICandidate>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  institution: { type: String, required: true },
  category: { type: String, required: true },
  presentationType: { type: String, required: true },
  paperId: { type: String, required: false },
  paymentReference: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Candidate = models.Candidate || model<ICandidate>('Candidate', CandidateSchema);

export default Candidate;
