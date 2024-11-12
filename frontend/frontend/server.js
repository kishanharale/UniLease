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
    user: 'Jethin',
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
        const recipientEmail = user.email;
        const subject = 'Sign-In Notification';
        const message = `Hello ${user.username},\n\nYou have successfully signed in to UniLease. If this wasn't you, please contact support immediately.`;

        const mailOptions = {
            from: 'your-email@gmail.com', // Replace with your email
            to: recipientEmail,
            subject: subject,
            text: message
        };

        // Attempt to send the email
        try {
            await transporter.sendMail(mailOptions);
            console.log('Sign-in notification email sent successfully');
        } catch (error) {
            console.error('Error sending sign-in notification email:', error.message);
        }

        // Respond with the token
        res.json({ token });
    } catch (error) {
        console.error('Error during sign-in:', error.message);
        res.status(500).json({ error: 'Error during sign-in' });
    }
});

// Protected route to fetch apartments with favorite status
app.get('/apartments', verifyToken, async (req, res) => {
    try {
        // Check if user ID exists in the request object (added by verifyToken middleware)
        if (!req.user || !req.user.userId) {
            console.error('Error: User ID is missing in the request.');
            return res.status(400).json({ error: 'User ID is missing' });
        }

        // Fetch apartments and favorite status for the logged-in user
        const apartments = await pool.query(`
            SELECT a.id, a.address, a.price, a.image_url, 
                   CASE WHEN f.user_id IS NOT NULL THEN true ELSE false END AS is_favorite
            FROM apartments a
            LEFT JOIN favorites f ON a.id = f.apartment_id AND f.user_id = $1
        `, [req.user.userId]);

        console.log('Apartments fetched successfully:', apartments.rows);
        res.json(apartments.rows);
    } catch (err) {
        console.error('Error fetching apartments:', err); // Log full error object
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});

// Endpoint to toggle favorite status
app.post('/favorites', verifyToken, async (req, res) => {
    const { houseId, isFavorite } = req.body;
    const userId = req.user.userId;

    try {
        if (isFavorite) {
            // Add to favorites if marked as favorite
            await pool.query(
                'INSERT INTO favorites (user_id, apartment_id) VALUES ($1, $2) ON CONFLICT DO NOTHING',
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

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
