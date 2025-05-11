// tests/bot.test.js
const { Telegraf } = require('telegraf');
const balanceCommand = require('../bot/commands/balance');
const marketOrderCommand = require('../bot/commands/market_order');
const limitOrderCommand = require('../bot/commands/limit_order');
const sellOrderCommand = require('../bot/commands/sell_order');

// Mock Telegraf context
const createContext = () => ({
  reply: jest.fn(),
});

describe('Bot Commands', () => {
  it('should execute the balance command', async () => {
    const ctx = createContext();
    await balanceCommand.execute(ctx);
    expect(ctx.reply).toHaveBeenCalled();
  });

  it('should execute the market_order command', async () => {
    const ctx = createContext();
    const quantity = 1;
    const symbol = 'SOL';
    await marketOrderCommand.execute(ctx, quantity, symbol);
    expect(ctx.reply).toHaveBeenCalledWith(`Market order placed for ${quantity} ${symbol}.`);
  });

  it('should execute the limit_order command', async () => {
    const ctx = createContext();
    const quantity = 1;
    const price = 100;
    const symbol = 'SOL';
    await limitOrderCommand.execute(ctx, quantity, price, symbol);
    expect(ctx.reply).toHaveBeenCalledWith(`Limit order placed for ${quantity} ${symbol} at price ${price}.`);
  });

    it('should execute the sell_order command', async () => {
    const ctx = createContext();
    const quantity = 1;
    const symbol = 'SOL';
    await sellOrderCommand.execute(ctx, quantity, symbol);
    expect(ctx.reply).toHaveBeenCalledWith(`Sell order placed for ${quantity} ${symbol}.`);
  });
});
