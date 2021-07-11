import React from 'react';
import { GlobalContext } from '../interfaces';

const UserContext = React.createContext<[
  GlobalContext,
  React.Dispatch<React.SetStateAction<GlobalContext>>,
] | [GlobalContext, null]>(
  [{ addNotification: () => { } }, null],
);

export default UserContext;
