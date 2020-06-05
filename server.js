const express = require('express');
const server = express();
const helmet = require('helmet');
const userRouter = require('./users/userRouter');
const colors = require('colors');

server.use(logger);
server.use(helmet());

server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}


module.exports = server;
