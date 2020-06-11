const express = require('express');
const server = express();
const helmet = require('helmet');
var cors = require('cors')
const userRouter = require('./users/userRouter');
const postsRouter = require('./posts/postRouter');
const colors = require('colors');

server.use(cors());
server.use(logger);
server.use(helmet());
server.use(express.json())

server.use('/api/users', userRouter);
server.use('/posts', postsRouter);

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
