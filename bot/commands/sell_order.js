// bot/commands/sell_order.js

module.exports = {
  name: 'sell_order',
  description: 'Place a sell order.',
  async execute(ctx, quantity, symbol) {
    if (!quantity || !symbol) {
      return ctx.reply('Usage: /sell_order [quantity] [SOL]');
    }
    // Mock sell order placement (replace with actual Solana sell order logic)
    ctx.reply(`Sell order placed for ${quantity} ${symbol}.`);
  },
};
