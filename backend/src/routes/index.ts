import adminRoute from './admin.route';
import avatarRoute from './avatar.route';
import docsRoute from './docs.route';
import musicRoute from './music.route';
import pinRoute from './pin.route';
import surveyRoute from './survey.route';
import tokenRoute from './token.route';
import userRoute from './user.route';
import videoRoute from './video.route';
import vodkaRoute from './vodka.route';

export default {
  docs: docsRoute,
  api: [
    userRoute,
    tokenRoute,
    videoRoute,
    adminRoute,
    pinRoute,
    avatarRoute,
    vodkaRoute,
    surveyRoute,
    musicRoute,
  ],
};
