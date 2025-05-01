// bot/commands/sell_order.js
const { Telegraf } = require('telegraf');

module.exports = {
  name: 'sell',
  description: 'Execute a market sell order.',
  execute: async (ctx) => {
    const args = ctx.message.text.split(' ');
    if (args.length !== 3) {
      return ctx.reply('Usage: /sell <symbol> <quantity>');
    }

    const symbol = args[1].toUpperCase();
    const quantity = parseFloat(args[2]);

    if (isNaN(quantity) || quantity <= 0) {
      return ctx.reply('Invalid quantity. Please provide a positive number.');
    }

    try {
      // In a real application, you would interact with your backend here
      // to execute the sell order.
      // This is a placeholder for the actual trading logic.
      console.log(`Simulating sell order: Sell ${quantity} ${symbol}`);
      ctx.reply(`Simulating selling ${quantity} ${symbol}. Order placed.`);
    } catch (error) {
      console.error('Error placing sell order:', error);
      ctx.reply('Failed to place sell order. Please try again later.');
    }
  },
};
