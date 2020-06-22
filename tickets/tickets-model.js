const db = require('../data/dbConfig');

const get = async () => {
  return await db('tickets');
}

const getBy = async (filter) => {
  return await db('tickets').where(filter).first();
}

const add = async (ticket) => {
  await db('tickets').insert(ticket, "id");
  return await get();
}

const update = async (id, ticket) => {
  await db('tickets').where({ id }).update(ticket);
  return await db('tickets').where({ id });
}

const remove = async (id) => {
  const ticket = await db('tickets').where({ id });
  await db('tickets').where({ id }).del();
  return ticket;
}

module.exports = {
  get,
  getBy,
  add,
  update,
  remove
}