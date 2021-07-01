export interface UserContextInterface {
  JWT?: string,
  user?: {
    id: string,
    firstName: string,
    lastName: string,
    username: string,
    avatar?: string,
    greetingVideo?: string,
  }
}
