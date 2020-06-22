const router = require('express').Router();
const Users = require('./users-models.js');
const { validateUserExists } = require('../middleware');

router.get('/:id', validateUserExists, async (req, res) => {
  const { id, username, is_helper, email } = req.user;

  res.status(200).json({ id, username, is_helper, email });
})

router.get('/:id/tickets', validateUserExists, async (req, res) => {
  try {
    const user = req.user;
    if(user.is_helper) {
      const tickets = await Users.getAssignedTickets(user.id);
      res.status(200).json(tickets);
    } else {
      const tickets = await Users.getUsersCreatedTickets(user.id);
      res.status(200).json(tickets);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Could not get user tickets from database" });
  }
})

module.exports = router;