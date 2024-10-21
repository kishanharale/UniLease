// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse incoming JSON data

// PostgreSQL connection pool
const pool = new Pool({
    user: 'likhith',           
    host: 'localhost',               
    database: 'Unilease',  
    password: '1234',       
    port: 5432                       

});

// API endpoint to fetch apartments
app.get('/apartments', async (req, res) => {
  try {
    const apartments = await pool.query('SELECT * FROM apartments');
    res.json(apartments.rows); // Send apartment data as JSON
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
