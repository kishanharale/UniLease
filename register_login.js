const express = require('express');
const bcrypt = require('bcrypt');

module.exports = (pool) => {
  const router = express.Router();

  // Register Route
  router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
        [username, email, hashedPassword]
      );
      res.status(201).send({ userId: result.rows[0].id });
    } catch (err) {
      res.status(500).send('Error creating user');
    }
  });

  // Login Route
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      
      if (user && await bcrypt.compare(password, user.password_hash)) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (err) {
      res.status(500).send('Error during login');
    }
  });

  return router;
};
