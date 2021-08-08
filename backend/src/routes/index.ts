import userRoute from './user.route';
import tokenRoute from './token.route';
import docsRoute from './docs.route';
import videoRoute from './video.route';
import adminRoute from './admin.route';
import pinRoute from './pin.route';
import avatarRoute from './avatar.route';
import vodkaRoute from './vodka.route';
import surveyRoute from './survey.route';

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
  ],
};
