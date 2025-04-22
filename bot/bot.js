// bot/bot.js

// Import the Telegram Bot API
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Command handlers (import them)
const balanceCommand = require('./commands/balance');
const marketOrderCommand = require('./commands/market_order');

// Set up command handlers
bot.onText(//balance/, (msg) => balanceCommand.execute(bot, msg));
bot.onText(//market_order (.+)/, (msg, match) => marketOrderCommand.execute(bot, msg, match));

// Start listening for messages
console.log('Bot started...');