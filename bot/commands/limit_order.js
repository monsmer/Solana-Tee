// bot/commands/limit_order.js

module.exports = {
  name: 'limit_order',
  description: 'Place a limit order.',
  async execute(ctx, quantity, price, symbol) {
    if (!quantity || !price || !symbol) {
      return ctx.reply('Usage: /limit_order [quantity] [price] [SOL]');
    }

    // Mock limit order placement (replace with actual Solana limit order logic)
    ctx.reply(`Limit order placed for ${quantity} ${symbol} at price ${price}.`);
  },
};
