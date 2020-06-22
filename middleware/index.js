const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const Users = require('../users/users-models.js');
const Tickets = require('../tickets/tickets-model.js');

const validateUserExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await Users.getBy({ id });
    
    if(!user) return res.status(404).json({ error: "Couldnt find user with that id" });
    req.user = user;

    next();
  } catch(err) {
    res.status(500).json({ error: "Couldn't retrieve user from database" })
  }
}


const validateTicketExists = async (req, res, next) => {
  const { id } = req.params;
  try {
    const ticket = await Tickets.getBy({ id });

    if (!ticket) return res.status(404).json({ error: "Couldnt find ticket with that id" });
    req.ticket = ticket;

    next();
  } catch (err) {
    res.status(500).json({ error: "Couldn't retrieve ticket from database" })
  }
}

const validateUserBody = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password){
    return res.status(400).json({ error: 'Provide both a username and password' }); 
  }
  next();
}

const validateTicketBody = (req, res, next) => {
  const { title, description, tried } = req.body;

  if (!title || !description || !tried ) {
    return res.status(400).json({ error: 'Provide title, description, and tried' });
  }
  next();
}

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, secrets.jwtSecret, (err, decoded) => {
      if(err) return res.status(401).json({ error: 'Incorrect token provided' });
      req.decoded = decoded;
      next()
    })
  } else {
    return res.status(400).json({ error: 'Must provide a token in authorization header' })
  }
}

module.exports = {
  validateUserExists,
  validateTicketExists,
  validateUserBody,
  validateTicketBody,
  authenticateUser
}