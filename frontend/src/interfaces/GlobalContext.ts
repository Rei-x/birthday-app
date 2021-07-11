import { UserInterface } from './UserInterface';

export interface GlobalContext {
  JWT?: string,
  user?: UserInterface,
  addNotification: (title: string, children: React.ReactNode) => void
}
