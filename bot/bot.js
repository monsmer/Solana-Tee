const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  console.error('TELEGRAM_BOT_TOKEN is not defined in .env');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Command registration (example)
require('./commands/balance')(bot);
require('./commands/market_order')(bot);
require('./commands/limit_order')(bot);
require('./commands/sell_order')(bot);

// Basic error handling
bot.on('polling_error', (error) => {
  console.log(error);
});

console.log('Bot is running...');