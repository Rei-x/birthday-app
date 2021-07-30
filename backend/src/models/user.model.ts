import path from 'path';
import { Schema, model, Document, PaginateModel } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface UserInterface extends Document<UserInterface> {
  username: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  passwordHash?: string;
  avatar: string;
  video?: string;
  hasCompletedPoll: boolean;
  hasCompletedVodkaPoll: boolean;
  hasConfirmedAttendance: boolean;
}

const schema = new Schema({
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
  avatar: {
    type: String,
    default: path.join(__dirname, '../../', '/static/defaultAvatar.png'),
  },
  video: String,
  hasCompletedPoll: {
    type: Boolean,
    default: false,
  },
  hasCompletedVodkaPoll: {
    type: Boolean,
    default: false,
  },
  hasConfirmedAttendance: {
    type: Boolean,
    default: false,
  }
});

schema.plugin(mongoosePaginate);

const UserModel: PaginateModel<UserInterface> = model<
  UserInterface,
  PaginateModel<UserInterface>
>('User', schema);

export { UserModel, UserInterface };
