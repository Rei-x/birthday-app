import { useEffect, useState } from 'react';
import Api from '../api';

type UseApiType = [boolean, undefined | Api];

const useApi = (context?: { JWT?: string }) => {
  const [state, setState] = useState<UseApiType>([false, undefined]);
  useEffect(() => {
    if (context?.JWT) {
      const api = new Api(context.JWT);
      setState([true, api]);
    } else {
      setState([false, undefined]);
    }
  }, [context?.JWT]);
  return state;
};

// eslint-disable-next-line import/prefer-default-export
export { useApi };
