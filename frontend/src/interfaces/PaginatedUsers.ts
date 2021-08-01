import { PaginationInterface } from './Pagination';
import { UserInterface } from './UserInterface';

export interface AdminPaginatedUsers extends PaginationInterface {
  docs: UserInterface[]
}

export interface UserPaginatedUsers extends PaginationInterface {
  docs: Pick<UserInterface, 'username'|'firstName'|'lastName'|'hasConfirmedAttendance'>[]
}
