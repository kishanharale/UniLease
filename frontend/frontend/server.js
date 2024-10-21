// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

// PostgreSQL connection pool
const pool = new Pool({
    user: 'likhith',
    host: 'localhost',
    database: 'Unilease',
    password: '1234',
    port: 5432
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// JWT secret key
const secretKey = 'your_jwt_secret_key';

// Sign-up API endpoint
app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

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

// Sign-in API endpoint
app.post('/signin', async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid username' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during sign-in:', error.message);
        res.status(500).json({ error: 'Error during sign-in' });
    }
});

// Middleware to verify JWT token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Access denied, no token provided' });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
}

// API endpoint to fetch apartments (protected route)
app.get('/apartments', authenticateToken, async (req, res) => {
    try {
        const apartments = await pool.query('SELECT * FROM apartments');
        res.json(apartments.rows); // Send apartment data as JSON
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Test route to check if backend is working
app.get('/', (req, res) => {
    res.send('Backend is working!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
