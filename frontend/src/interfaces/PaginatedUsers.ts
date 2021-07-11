import { PaginationInterface } from './Pagination';
import { UserInterface } from './UserInterface';

export interface PaginatedUsers extends PaginationInterface {
  docs: UserInterface[]
}
