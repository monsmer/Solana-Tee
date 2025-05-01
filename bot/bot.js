// bot/bot.js
const { Telegraf } = require('telegraf');
require('dotenv').config({ path: './config/.env' });

const marketOrderCommand = require('./commands/market_order');
const balanceCommand = require('./commands/balance');
const sellOrderCommand = require('./commands/sell_order');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome to the Solana Trading Bot!'));

// Register commands
bot.command(marketOrderCommand.name, (ctx) => marketOrderCommand.execute(ctx));
bot.command(balanceCommand.name, (ctx) => balanceCommand.execute(ctx));
bot.command(sellOrderCommand.name, (ctx) => sellOrderCommand.execute(ctx));

bot.help((ctx) => {
  ctx.reply('Available commands:\n/buy <symbol> <quantity> - Place a market buy order\n/balance - Check your balance\n/sell <symbol> <quantity> - Place a market sell order');
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
