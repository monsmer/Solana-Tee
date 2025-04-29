// bot/commands/market_order.js
const { Connection, Keypair, Transaction, SystemProgram, clusterApiUrl } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } = require('@solana/spl-token');

// Replace with your actual DEX integration (e.g., Orca)
const ORCA_SWAP_ADDRESS = '9W959DqEETiGZocYWCQPaJ6sBmUzgfxX3Q75hmnbvGC'; // Example Orca swap address

// Replace with your wallet's private key (for testing purposes only! Use a secure method in production)
const PRIVATE_KEY = process.env.PRIVATE_KEY; // This MUST come from an environment variable or a secure storage solution.

async function executeMarketOrder(chatId, symbol, quantity, bot) {
  try {
    // Solana connection
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

    // Load wallet from private key
    const payer = Keypair.fromSecretKey(Buffer.from(JSON.parse(PRIVATE_KEY)));

    // Placeholder for token mint - Replace with actual SOL mint address
    const tokenMint = 'So1111111111111111111111111111111111111112';

    // Get or create associated token accounts
    const payerTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        payer,
        tokenMint,
        payer.publicKey
    );

    // Dummy logic - Replace with actual DEX interaction
    const lamports = quantity * 1000000000; // Convert SOL to lamports (example)

    // Create a dummy transaction to transfer SOL
    const transaction = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: payerTokenAccount,
            lamports,
        })
    );


    // Sign and send transaction
    transaction.feePayer = payer.publicKey;
    let blockhash = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash.blockhash;

    const signature = await connection.sendTransaction(
        transaction,
        [payer]
    );

    await connection.confirmTransaction(signature);

    // Respond to the user
    bot.sendMessage(chatId, `Successfully bought ${quantity} ${symbol}. Transaction: ${signature}`);
  } catch (error) {
    console.error('Error executing market order:', error);
    bot.sendMessage(chatId, `Failed to buy ${symbol}. Error: ${error.message}`);
  }
}

module.exports = (bot) => {
  bot.onText(//buy (.+) (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const symbol = match[1].toUpperCase();
    const quantity = parseFloat(match[2]);

    if (isNaN(quantity) || quantity <= 0) {
      bot.sendMessage(chatId, 'Invalid quantity. Please enter a positive number.');
      return;
    }

    executeMarketOrder(chatId, symbol, quantity, bot);
  });
};
