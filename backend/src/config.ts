import dotenv from 'dotenv';

dotenv.config();

class EnvError extends Error {
  constructor(envVariableName: string) {
    super(`${envVariableName} wasn't specified in environmental variables.`);
  }
}

interface EnvVariables {
  DB_URL: string;
  SECRET: string;
  ORIGIN: string | Array<string>;
  PORT: string;
  UPLOAD_PATH: string;
  POLL_ACCESS_KEY: string;
  POLL_ID: string;
}

const { DB_URL, SECRET, ORIGIN, NODE_ENV, PORT, POLL_ACCESS_KEY, POLL_ID } =
  process.env;

if (!DB_URL) throw new EnvError('DB_URL');
if (!SECRET) throw new EnvError('SECRET');
if (!ORIGIN && NODE_ENV === 'production') throw new EnvError('ORIGIN');
if (!POLL_ACCESS_KEY) throw new EnvError('POLL ACCESS KEY');
if (!POLL_ID) throw new EnvError('POLL ID');

const originArray = ORIGIN?.split(/, |,/);

const origin = originArray?.length === 1 ? originArray.join('') : originArray;

const CheckedEnvVariables: EnvVariables = {
  DB_URL,
  SECRET,
  ORIGIN: origin || `localhost:${PORT}`,
  PORT: PORT || '3000',
  UPLOAD_PATH:
    NODE_ENV === 'test'
      ? `${__dirname}/../testUploads`
      : `${__dirname}/../uploads`,
  POLL_ACCESS_KEY,
  POLL_ID,
};

export default CheckedEnvVariables;
