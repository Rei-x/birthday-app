import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document{
  username: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  passwordHash?: string
  avatar?: string
  greetingVideo?: string
}

const schema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  passwordHash: String,
  avatar: String,
  greetingVideo: String,
});

const UserModel = model<UserInterface>('User', schema);

export { UserModel, UserInterface };
