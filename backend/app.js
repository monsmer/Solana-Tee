const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({ path: './config/.env' });

const privateKey = process.env.SOLANA_PRIVATE_KEY;

// Example usage. Replace with actual logic
app.get('/api/test', (req, res) => {
  if (!privateKey) {
    return res.status(500).send({ error: 'SOLANA_PRIVATE_KEY not configured' });
  }
  res.send({ message: 'API is working', privateKeyExists: true });
});

const port = 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
