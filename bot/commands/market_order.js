// bot/commands/market_order.js

module.exports = {
  name: 'market_order',
  description: 'Place a market order.',
  async execute(ctx, quantity, symbol) {
    if (!quantity || !symbol) {
      return ctx.reply('Usage: /market_order [quantity] [SOL]');
    }

    // Mock market order placement (replace with actual Solana market order logic)
    ctx.reply(`Market order placed for ${quantity} ${symbol}.`);
  },
};
