import { Schema, model, Document } from 'mongoose';

interface UserInterface extends Document{
  username: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  avatar?: string
  greetingVideo?: string
}

const schema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
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
  avatar: String,
  greetingVideo: String,
});

const UserModel = model<UserInterface>('User', schema);

export { UserModel, UserInterface };
