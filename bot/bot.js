// bot/bot.js
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

// Load commands
const commands = {};
const commandFiles = fs.readdirSync('./bot/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands[command.name] = command;
}

bot.on('message', (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  if (!text) return;

  if (text.startsWith('/')) {
    const commandName = text.slice(1).split(' ')[0];
    const args = text.slice(1).split(' ').slice(1);

    if (commands[commandName]) {
      commands[commandName].execute(msg, args);
    } else {
      bot.sendMessage(chatId, 'Unknown command.');
    }
  }
});

console.log('Bot is running...');