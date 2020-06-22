const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const ticketsRouter = require('../tickets/tickets-router.js');

const { validateUserBody, authenticateUser } = require('../middleware');

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/api/auth', validateUserBody, authRouter);
server.use('/api/users', authenticateUser, usersRouter);
server.use('/api/tickets', authenticateUser, ticketsRouter);

server.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Dev Desk API" })
})

module.exports = server;