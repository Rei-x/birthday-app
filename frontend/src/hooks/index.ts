import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts';
import Api, { GlobalContextInterface } from '../api';

const useApi = (
  context?: { JWT?: string; apiClient?: Api },
  setContext?: React.Dispatch<React.SetStateAction<GlobalContextInterface>>
) => {
  const [defaultContext, setDefaultContext] = useContext(UserContext);
  const [apiClient, setApiClient] = useState<Api | undefined>(undefined);
  const contextUnified = context || defaultContext;
  const setContextUnified = setContext || setDefaultContext;

  const setStateAndContext = useCallback(
    (api: Api) => {
      setApiClient(api);
      if (setContextUnified)
        setContextUnified((oldContext) => ({
          ...oldContext,
          apiClient: api,
        }));
    },
    [setApiClient, setContextUnified]
  );

  useEffect(() => {
    if (
      contextUnified.JWT &&
      setContextUnified &&
      contextUnified.apiClient === undefined
    ) {
      const api = new Api(contextUnified.JWT);
      setStateAndContext(api);
    }
  }, [
    contextUnified.JWT,
    contextUnified.apiClient,
    setContextUnified,
    setStateAndContext,
  ]);

  useEffect(() => {
    setApiClient(contextUnified.apiClient);
  }, [contextUnified.apiClient]);

  return apiClient;
};

// eslint-disable-next-line import/prefer-default-export
export { useApi };
