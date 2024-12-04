const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Import nodemailer

const app = express();
const port = 3000;

// PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
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

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jethinreddy17@gmail.com', // Replace with your email
        pass: 'redk fmkb oolb rbhx' // Replace with your app-specific password
    }
});

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

// Sign-in endpoint with email notification
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
        
        // Send an email notification on successful sign-in
        const mailOptions = {
            from: 'jethinreddy17@gmail.com', // Replace with your email
            to: user.email,
            subject: 'Sign-In Notification',
            text: `Hello ${user.username},\n\nYou have successfully signed in to UniLease. If this wasn't you, please contact support immediately.`
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log('Sign-in notification email sent successfully');
        } catch (error) {
            console.error('Error sending sign-in notification email:', error.message);
        }

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
            res.json({
                id: result.rows[0].id,
                name: result.rows[0].username,
                email: result.rows[0].email,
                created_at: result.rows[0].created_at
            });
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

// Toggle favorite status
app.post('/favorites', verifyToken, async (req, res) => {
    const { houseId, isFavorite } = req.body;
    const userId = req.user.userId;

    try {
        if (isFavorite) {
            await pool.query(
                'INSERT INTO favorites (user_id, apartment_id, created_at) VALUES ($1, $2, NOW()) ON CONFLICT DO NOTHING',
                [userId, houseId]
            );
        } else {
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

// Favorites list for authenticated user
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

// Add new house to apartments
app.post('/api/addhouse', async (req, res) => {
    const { address, university_id, price, image_url } = req.body;

    try {
        const query = `
            INSERT INTO apartments (address, university_id, price, image_url)
            VALUES ($1, $2, $3, $4) RETURNING *;
        `;
        const values = [address, university_id, price, image_url];

        const result = await pool.query(query, values);
        console.log('New house data inserted:', result.rows[0]);
        res.status(201).json({ message: 'House added successfully', house: result.rows[0] });
    } catch (error) {
        console.error('Error inserting data:', error);
        res.status(500).json({ message: 'Failed to add house', error });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
