import React from 'react';
import { GlobalContextInterface } from '../api';

const UserContext = React.createContext<
  | [
      GlobalContextInterface,
      React.Dispatch<React.SetStateAction<GlobalContextInterface>>
    ]
  | [GlobalContextInterface, null]
>([{ addNotification: () => {} }, null]);

export default UserContext;
