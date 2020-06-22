const router = require('express').Router();
const Tickets = require('./tickets-model.js');
const { validateTicketBody, validateTicketExists } = require('../middleware');

router.get('/', async (req, res) => {
  try {
    const tickets = await Tickets.get();
    res.status(200).json(tickets);
  } catch(err) {
    res.status(500).json({ error: "Could not retrieve tickets" })
  }
})

router.get('/:id', validateTicketExists, async (req, res) => {
  res.status(200).json(req.ticket);
})

router.post('/', validateTicketBody, async (req, res) => {
  try {
    const ticket = req.body;
    const newTicket = await Tickets.add({...ticket, created_by: req.decoded.subject });
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: "Could not add ticket to database" })
  }
})

router.put('/:id', validateTicketExists, validateTicketBody, async (req, res) => {
  try {
    const ticket = req.body;
    const updatedTicket = await Tickets.update(req.ticket.id, ticket);
    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(500).json({ error: "Could not update ticket in database" })
  }
})

router.delete('/:id', validateTicketExists, async (req, res) => {
  try {
    const removedTicket = await Tickets.remove(req.ticket.id);
    res.status(200).json(removedTicket);
  } catch (err) {
    res.status(500).json({ error: "Could not add ticket to database" })
  }
})

module.exports = router;