const db = require('../data/dbConfig');

const get = async () => {
  return await db('users');
}

const getBy = async (filter) => {
  return await db('users').where(filter).first();
}

const add = async (user) => {
  const [ id ] = await db('users').insert(user, "id");
  return await getBy({ id });
}

const getUsersCreatedTickets = async (userId) => {
  return await db('tickets').where({ created_by: userId });
}

const getAssignedTickets = async (userId) => {
  return await db('tickets').where({ assigned_to: userId });
}

module.exports = {
  get,
  getBy,
  add,
  getUsersCreatedTickets,
  getAssignedTickets
}