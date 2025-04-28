// bot/commands/balance.js
const { Connection, PublicKey } = require('@solana/web3.js');
const { TOKEN_PROGRAM_ID } = require('@solana/spl-token');
require('dotenv').config();

module.exports = {
  name: 'balance',
  description: 'Check your Solana balance.',
  async execute(ctx, args) {
    try {
      const userPublicKey = new PublicKey(ctx.from.id.toString()); // Using telegram user id as public key
      const connection = new Connection(process.env.SOLANA_RPC_URL, 'confirmed');

      const balance = await connection.getBalance(userPublicKey);

      ctx.reply(`Your Solana balance is: ${balance / 1000000000} SOL`);
    } catch (error) {
      console.error('Error fetching balance:', error);
      ctx.reply('An error occurred while fetching your balance. Make sure you add SOL and that your telegram id is your public key!');
    }
  },
};
