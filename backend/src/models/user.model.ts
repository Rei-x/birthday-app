import {
  Schema, model, Document, PaginateModel,
} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

interface UserInterface extends Document<UserInterface>{
  username: string
  firstName: string
  lastName: string
  role: 'user' | 'admin'
  passwordHash?: string
  avatar?: string
  greetingVideo?: string
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
  avatar: String,
  greetingVideo: String,
});

schema.plugin(mongoosePaginate);

const UserModel: PaginateModel<UserInterface> = model<UserInterface, PaginateModel<UserInterface>>('User', schema);

export { UserModel, UserInterface };
