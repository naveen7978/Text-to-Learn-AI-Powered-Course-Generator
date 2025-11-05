const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON bodies

// A simple test route
app.get('/', (req, res) => {
  res.send('Hello from the Text-to-Learn Backend!');
});

const PORT = process.env.PORT || 5000; // Use port 5000 as a default [cite: 228]

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});