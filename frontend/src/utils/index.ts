// eslint-disable-next-line import/prefer-default-export
export const getUrl = () => {
  let url = `${window.location.protocol}//${window.location.hostname}`;
  if (window.location.port) url += `:${window.location.port}`;
  return url;
};
