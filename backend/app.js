// backend/app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Solana-Tee Backend API');
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});