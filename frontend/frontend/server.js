const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// PostgreSQL connection pool
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

// Sign-in endpoint
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

        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during sign-in:', error.message);
        res.status(500).json({ error: 'Error during sign-in' });
    }
});

// Profile Details Endpoint
app.get('/user/profile', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await pool.query(
            'SELECT id, username, email, created_at FROM users WHERE id = $1',
            [userId]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Protected route to fetch apartments with favorite status
app.get('/apartments', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const apartments = await pool.query(`
            SELECT a.id, a.address, a.price, a.image_url, 
                   CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END AS is_favorite
            FROM apartments a
            LEFT JOIN favorites f ON a.id = f.apartment_id AND f.user_id = $1
        `, [userId]);

        res.json(apartments.rows);
    } catch (err) {
        console.error('Error fetching apartments:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// Favorites Endpoint to toggle favorite status
app.post('/favorites', verifyToken, async (req, res) => {
    const { houseId, isFavorite } = req.body;
    const userId = req.user.userId;

    try {
        if (isFavorite) {
            // Add to favorites if marked as favorite
            await pool.query(
                'INSERT INTO favorites (user_id, apartment_id, created_at) VALUES ($1, $2, NOW()) ON CONFLICT DO NOTHING',
                [userId, houseId]
            );
        } else {
            // Remove from favorites if unmarked
            await pool.query(
                'DELETE FROM favorites WHERE user_id = $1 AND apartment_id = $2',
                [userId, houseId]
            );
        }
        res.status(200).json({ message: 'Favorite status updated successfully' });
    } catch (error) {
        console.error('Error updating favorite status:', error.message);
        res.status(500).json({ error: 'Error updating favorite status' });
    }
});

// Recent Activity Endpoint
app.get('/user/activity', verifyToken, async (req, res) => {
    try {
        const userId = req.user.userId;
        const result = await pool.query(
            `SELECT a.id, a.address, a.price, f.created_at AS favorited_at
             FROM apartments a
             INNER JOIN favorites f ON a.id = f.apartment_id
             WHERE f.user_id = $1
             ORDER BY f.created_at DESC
             LIMIT 10`,
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching recent activity:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});

// Favorites Endpoint to get the list of favorites for the authenticated user
app.get('/favorites', verifyToken, async (req, res) => {
    const userId = req.user.userId;

    try {
        const result = await pool.query(
            `SELECT a.id, a.address, a.price, a.image_url
             FROM apartments a
             INNER JOIN favorites f ON a.id = f.apartment_id
             WHERE f.user_id = $1`,
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching favorites:', error.message);
        res.status(500).json({ error: 'Server error' });
    }
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
