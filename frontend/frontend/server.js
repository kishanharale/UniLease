const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'likhith',           
    host: 'localhost',               
    database: 'Unilease',  
    password: '1234',       
    port: 5432                       
});

app.use(cors());
app.use(bodyParser.json());

// Secret key for JWT
const secretKey = 'your_jwt_secret_key';

// Middleware to verify the JWT token
function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).send({ error: 'Access denied, no token provided' });

    try {
        const verified = jwt.verify(token, secretKey);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ error: 'Invalid token' });
    }
}

// Sign-up endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);  // Hash the password

    try {
        const result = await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
            [username, email, hashedPassword]
        );
        res.status(201).json({ user: result.rows[0] }); 
    } catch (error) {
        console.error('Error during sign-up:', error.message);
        res.status(500).json({ error: 'Error during sign-up' });
    }
});

// Sign-in endpoint
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid username' });
        }

        const user = result.rows[0];

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Create and sign a JWT token
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during sign-in:', error.message);
        res.status(500).json({ error: 'Error during sign-in' });
    }
});

// Protected route to fetch apartments
app.get('/apartments', verifyToken, async (req, res) => {
    try {
        const apartments = await pool.query('SELECT * FROM apartments');
        res.json(apartments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
