import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const SECRET = process.env.SECRET || 'dog';

const config = {
  PORT,
  SECRET,
};

export default config;
