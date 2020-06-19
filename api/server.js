const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../auth/users-router.js');
const ticketsRouter = require('../auth/tickets-router.js');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/tickets', ticketsRouter);

module.exports = server;