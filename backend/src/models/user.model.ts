import { Schema, model } from 'mongoose';

interface UserInterface {
  username: string
  firstName: string
  lastName: string
  avatar?: string
  role: 'user' | 'admin'
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
  avatar: String,
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

const UserModel = model<UserInterface>('User', schema);

export { UserModel, UserInterface };
