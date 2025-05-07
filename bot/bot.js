// bot.js

const TelegramBot = require('node-telegram-bot-api');
const redis = require('redis');
require('dotenv').config({ path: './config/.env' });

const token = process.env.TELEGRAM_BOT_TOKEN;

// Initialize Redis client
const redisClient = redis.createClient();

redisClient.on('error', err => console.log('Redis Client Error', err));

(async () => {
  await redisClient.connect();
})();

const bot = new TelegramBot(token, { polling: true });

// Rate limiting middleware for Telegram Bot
const applyRateLimit = async (chatId, command) => {
  const key = `user:${chatId}:${command}`;
  const limit = 5; // Maximum 5 requests
  const window = 60; // per 60 seconds

  const now = Math.floor(Date.now() / 1000);
  const timestamps = await redisClient.zRange(key, 0, -1);
  const oldTimestamps = timestamps.filter(timestamp => now - timestamp < window);
  const requestCount = oldTimestamps.length;

  if (requestCount >= limit) {
    return false;
  }

  await redisClient.zAdd(key, {score: now, value: now});
  await redisClient.expire(key, window + 10); // Add grace period to expire in redis

  return true;
};

// Example usage in command handlers
bot.onText(//balance/, async (msg, match) => {
  const chatId = msg.chat.id;

  if (!await applyRateLimit(chatId, 'balance')) {
    bot.sendMessage(chatId, 'Rate limit exceeded. Please wait before trying again.');
    return;
  }

  // Command logic here
  bot.sendMessage(chatId, 'Fetching balance...');
});

bot.onText(//market_order (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const orderParams = match[1];

    if (!await applyRateLimit(chatId, 'market_order')) {
        bot.sendMessage(chatId, 'Rate limit exceeded. Please wait before trying again.');
        return;
    }

    bot.sendMessage(chatId, `Processing Market Order for ${orderParams}...`);
});

// Implement other commands with rate limiting

module.exports = bot;