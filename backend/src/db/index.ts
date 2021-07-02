/* eslint-disable import/prefer-default-export */
import mongoose from 'mongoose';
import paginationOptions from './paginationOptions';
import getOffsetFromPage from './getOffsetFromPage';

export const connectToDatabase = async (url: string) => mongoose.connect(url,
  { useNewUrlParser: true, useUnifiedTopology: true });

export const closeConnectionToDatabase = async () => mongoose.connection.close();

export { paginationOptions, getOffsetFromPage };
