// Existing code...

const web3 = require('@solana/web3.js');
const token = require("@solana/spl-token");
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: './config/.env' });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Function to fetch SPL token accounts and their balances
async function getSplTokenBalances(connection, walletAddress) {
  try {
    const parsedTokenAccounts = await connection.getParsedTokenAccountsByOwner(
      new web3.PublicKey(walletAddress),
      { programId: token.TOKEN_PROGRAM_ID },
      'confirmed'
    );

    const tokenBalances = parsedTokenAccounts.value.map(account => {
      const tokenBalance = account.account.data.parsed.info.tokenAmount.uiAmount;
      const mintAddress = account.account.data.parsed.info.mint;
      return { mintAddress, balance: tokenBalance };
    });

    return tokenBalances;
  } catch (error) {
    console.error('Error fetching SPL token balances:', error);
    throw error;
  }
}

// Endpoint to retrieve SOL and SPL token balances
app.get('/api/balances/:walletAddress', async (req, res) => {
  const walletAddress = req.params.walletAddress;
  const connection = new web3.Connection(process.env.SOLANA_RPC_URL);

  try {
    // Get SOL balance
    const solBalance = await connection.getBalance(new web3.PublicKey(walletAddress));

    // Get SPL token balances
    const splTokenBalances = await getSplTokenBalances(connection, walletAddress);

    res.json({ solBalance: solBalance / web3.LAMPORTS_PER_SOL, splTokenBalances });
  } catch (error) {
    console.error('Error fetching balances:', error);
    res.status(500).json({ error: 'Failed to fetch balances' });
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});