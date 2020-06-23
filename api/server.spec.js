const request = require('supertest');

const server = require('./server.js');
const db = require('../data/dbConfig.js');


describe('server.js', () => {
  beforeEach(async () => {
    await db('tickets').truncate();
    await db('users').truncate();
  })

  it('should use testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })

  describe('should register and return new user', () => {
    it('should recieve 201 status on success', async () => {
      const response = await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });

      expect(response.status).toEqual(201);
    })

    it('should return object with username on success', async () => {
      const response = await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });

      expect(response.body).toHaveProperty('username', "test");
    })

    it('should return a 400 error if missing username', async () => {
      const response = await request(server).post('/api/auth/register').send({ password: 'pass' });

      expect(response.status).toEqual(400);
    })

    it('should return a 500 error if username already taken', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const response = await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass2' });

      expect(response.status).toEqual(500);
    })
  })

  describe('should login user and return token', () => {
    it('should recieve 200 status on success', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const response = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });

      expect(response.status).toEqual(200);
    })

    it('should return message on success', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const response = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });

      expect(response.body).toHaveProperty('username', "test");
    })

    it('should return token on success', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const response = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });

      expect(response.body).toHaveProperty('token');
    })

    it('should return a 400 error if missing password', async () => {
      const response = await request(server).post('/api/auth/login').send({ username: 'test' });

      expect(response.status).toEqual(400);
    })
  })


  describe('/api/tickets endpoint should work as expected', () => {
    it('should return an initial empty array of tickets', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      const responseTwo = await request(server).get('/api/tickets').set({ Authorization: responseOne.body.token });

      expect(responseTwo.body).toHaveLength(0);
    })

    it('should return with a 200 status on success', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      const responseTwo = await request(server).get('/api/tickets').set({ Authorization: responseOne.body.token });

      expect(responseTwo.status).toEqual(200);
    })

    it('should return with a 404 status on request to unknown ticket', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      const responseTwo = await request(server).get('/api/tickets/0').set({ Authorization: responseOne.body.token });

      expect(responseTwo.status).toEqual(404);
    })

    it('should return with a 401 status when given false token', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      const responseTwo = await request(server).get('/api/tickets').set({ Authorization: "badtokenlasdjfoiewjtkjln" });

      expect(responseTwo.status).toEqual(401);
    })

    it('should return with a 400 status when not given token', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      const responseTwo = await request(server).get('/api/tickets');

      expect(responseTwo.status).toEqual(400);
    })

    it('should post new ticket and return new array containing it', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      const responseTwo = await request(server).post('/api/tickets').set({ Authorization: responseOne.body.token }).send({ title: "test", description: "test",  tried: "test" });

      expect(responseTwo.body[0]).toHaveProperty("id", 1)
    })

    it('should return with a single ticket with matching id when given id parameter', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      await request(server).post('/api/tickets').set({ Authorization: responseOne.body.token }).send({ title: "test", description: "test", tried: "test" });
      const responseTwo = await request(server).get('/api/tickets/1').set({ Authorization: responseOne.body.token });

      expect(responseTwo.body).toHaveProperty("id", 1);
    })

    it('should update ticket with matching id when doing put request', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      await request(server).post('/api/tickets').set({ Authorization: responseOne.body.token }).send({ title: "test", description: "test", tried: "test" });
      await request(server).put('/api/tickets/1').set({ Authorization: responseOne.body.token }).send({ title: "updated test", description: "test", tried: "test" });
      const responseTwo = await request(server).get('/api/tickets/1').set({ Authorization: responseOne.body.token });

      expect(responseTwo.body).toHaveProperty("title", "updated test");
    })

    it('should delete ticket with matching id when doing delete request', async () => {
      await request(server).post('/api/auth/register').send({ username: 'test', password: 'pass' });
      const responseOne = await request(server).post('/api/auth/login').send({ username: 'test', password: 'pass' });
      await request(server).post('/api/tickets').set({ Authorization: responseOne.body.token }).send({ title: "test", description: "test", tried: "test" });
      await request(server).delete('/api/tickets/1').set({ Authorization: responseOne.body.token });
      const responseTwo = await request(server).get('/api/tickets/1').set({ Authorization: responseOne.body.token });

      expect(responseTwo.status).toEqual(404);
    })
  })
})