#!/usr/bin/env node

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getInput = async (prompt) => new Promise((resolve) => {
  readline.question(prompt, (username) => {
    resolve(username);
  });
});

const app = async () => {
  const username = await getInput('Username: ');
};
