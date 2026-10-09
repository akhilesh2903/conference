import mongoose, { Schema, model, models } from 'mongoose';

export interface ITrack {
  trackNumber: string;
  title: string;
  text: string;
  createdAt: Date;
}

const TrackSchema = new Schema<ITrack>({
  trackNumber: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Track = models.Track || model<ITrack>('Track', TrackSchema);

export default Track;
