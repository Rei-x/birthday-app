#!/usr/bin/env node
/* eslint-disable no-console */
import readline from 'readline';
import bcrypt from 'bcryptjs';
import { UserModel } from '../models';
import { connectToDatabase } from '../db';
import config from '../config';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = async (prompt: string) =>
  new Promise((resolve) => {
    rl.question(prompt, (username: string) => {
      resolve(username);
    });
  });

const app = async () => {
  await connectToDatabase(config.DB_URL);

  const username = await getInput('Username: ');
  const firstName = await getInput('First name: ');
  const lastName = await getInput('Last name: ');
  const password = await getInput('Password: ');

  const passwordHash = await bcrypt.hash(password as string, 5);

  await UserModel.create({
    username,
    firstName,
    lastName,
    role: 'admin',
    passwordHash,
  });
  console.log('User created!');
  process.exit(0);
};

app();
