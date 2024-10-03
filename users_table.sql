CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL, -- Store a hashed password
  role VARCHAR(50) DEFAULT 'student', -- user role (student/admin)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
