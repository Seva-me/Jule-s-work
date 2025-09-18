const express = require('express');
const app = express();

app.use(express.json());

const authRouter = require('./src/controller/userindex');

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
