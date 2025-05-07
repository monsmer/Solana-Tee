const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all origins, or configure as needed
app.use(cors());

// Rate limiting middleware
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message:
    'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiting middleware to API calls only
app.use('/api/', apiLimiter);

// Middleware to parse JSON
app.use(express.json());

// Sample API route (replace with your actual routes)
app.get('/api/data', (req, res) => {
  res.json({ message: 'This is a sample API endpoint' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});