
const express = require('express');
const http = require('http');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost',
  database: 'cloud_clone',
  password: 'Chede@5844',
  port: 5432,
});

app.use(cors());
app.use(express.json());


   
app.get ('/', (req, res) => {
     res.send('Hello from the server!')
    })
// User signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword]);
    res.json({ userId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
  }
});

// User login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Login error' });
  }
});

// File upload using S3
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  const params = {
    Bucket: 'your-s3-bucket-name', 
    Key: file.filename,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype,
    ACL: 'public-read',
  };
  
  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error uploading file' });
    } else {
      res.json({ fileUrl: data.Location });
    }
  });
});

// Start the server
server.listen(5000, () => {
  console.log('Server is running on port 5000');
});
