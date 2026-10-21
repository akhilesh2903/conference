import mongoose, { Schema, model, models } from 'mongoose';

export interface ITrack {
  trackNumber: string;
  title: string;
  text: string;
  image?: string;
  createdAt: Date;
}

const TrackSchema = new Schema<ITrack>({
  trackNumber: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

if (models.Track) {
  delete (models as any).Track;
}
const Track = model<ITrack>('Track', TrackSchema);

export default Track;
