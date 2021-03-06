export interface UserInterface {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  video?: string;
  hasCompletedPoll: boolean;
  vodkaPollChoice: string;
  hasConfirmedAttendance: 'yes' | 'idk' | 'no';
}
