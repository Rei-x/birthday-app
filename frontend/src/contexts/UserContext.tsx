import React from 'react';
import { UserContextInterface } from '../interfaces';

const UserContext = React.createContext<[
  UserContextInterface,
  React.Dispatch<React.SetStateAction<UserContextInterface>>,
] | [UserContextInterface, null]>(
  [{}, null],
);

export default UserContext;
