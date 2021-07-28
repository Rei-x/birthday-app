import { Schema, model, Document } from 'mongoose';
import { UserInterface } from './user.model';

interface PinInterface extends Document {
  pin: number;
  user: UserInterface;
  createdAt: Date;
  isActive: boolean;
}

const schema = new Schema<PinInterface>({
  pin: { required: true, type: Number, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { required: true, type: Date, default: Date.now },
  isActive: { required: true, type: Boolean, default: true },
});

const PinModel = model<PinInterface>('Pin', schema);

export { PinModel, PinInterface };
