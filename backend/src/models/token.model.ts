import { Schema, model, Document } from 'mongoose';
import { UserInterface } from './user.model';

interface TokenInterface extends Document {
  token: string;
  user: UserInterface;
  isActive: boolean;
  validUntil?: Date;
}

const schema = new Schema<TokenInterface>({
  token: { required: true, type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  isActive: { required: true, type: Boolean, default: true },
  validUntil: Date,
});

const TokenModel = model<TokenInterface>('Token', schema);

export { TokenModel, TokenInterface };
