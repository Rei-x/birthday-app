import { PaginationInterface } from './PaginationInterface';
import { UserInterface } from './UserInterface';

export interface PaginatedUsers extends PaginationInterface {
  docs: UserInterface[]
}
