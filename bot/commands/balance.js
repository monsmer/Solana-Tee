// bot/commands/balance.js
const { Telegraf } = require('telegraf');

module.exports = {
  name: 'balance',
  description: 'Check your Solana balance.',
  async execute(ctx) {
    // Mock balance check (replace with actual Solana balance retrieval logic)
    const balance = Math.random() * 10; // Simulate a balance between 0 and 10 SOL
    ctx.reply(`Your Solana balance is: ${balance.toFixed(2)} SOL`);
  },
};
