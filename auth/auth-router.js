const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const Users =  require('../users/users-models.js');
const generateToken = require('./generateToken.js');

router.post('/register', async (req, res) => {
  try {
    const { username, password, email, is_helper } = req.body;

    const hash = await bcryptjs.hashSync(password, process.env.HASH_ROUNDS || 8);

    const newUser = await Users.add({ username, password: hash, email, is_helper });
    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email, is_helper: newUser.is_helper });
  } catch (err) {
    res.status(500).json({ error: 'Could not add user to database' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ error: 'Provide both a username and password' });

  try {
    const user = await Users.getBy({ username });
    if(!user) return res.status(404).json({ error: 'Could not find a user with that username' });

    if (user && bcryptjs.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ id: user.id, username, is_helper: user.is_helper, token });
    } else {
      res.status(401).json({ error: 'Password is incorrect' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Could not retrieve user from database" });
  }
});


module.exports = router;
