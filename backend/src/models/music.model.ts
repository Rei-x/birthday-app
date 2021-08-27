import { Document, model, Schema } from 'mongoose';

interface MusicURLInterface extends Document {
  url: string;
  isActive: boolean;
}

const schema = new Schema<MusicURLInterface>({
  url: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    required: true,
  },
});

const MusicURLModel = model<MusicURLInterface>('Music', schema);

export { MusicURLModel, MusicURLInterface };
