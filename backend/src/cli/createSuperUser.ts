#!/usr/bin/env node
/* eslint-disable no-console */
import readline from 'readline';
import { UserModel } from '../models';
import { connectToDatabase } from '../db';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = async (prompt: string) => new Promise((resolve) => {
  rl.question(prompt, (username: string) => {
    resolve(username);
  });
});

const app = async () => {
  await connectToDatabase();

  const username = await getInput('Username: ');
  const firstName = await getInput('First name: ');
  const lastName = await getInput('Last name: ');

  await UserModel.create({
    username, firstName, lastName, role: 'admin',
  });
  console.log('User created!');
  process.exit(0);
};

app();
