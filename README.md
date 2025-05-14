# Solana-Tee

## Project Description

This project aims to create a Telegram Trading Bot and Mini App for Solana trading. The bot will allow users to execute trades directly from Telegram, and the mini app will provide a more comprehensive UI for managing accounts and trades.

## Deployment

### Backend (Express API)

The backend is deployed to Heroku.

1.  **Procfile:** A `Procfile` is included to tell Heroku how to run the application (`web: node backend/app.js`).
2.  **package.json:** The `start` script is defined to run the application (`node backend/app.js`).

#### Heroku Deployment Steps

1.  Create a Heroku account and install the Heroku CLI.
2.  Login to Heroku CLI: `heroku login`
3.  Create a Heroku application: `heroku create`
4.  Deploy the application: `git push heroku main`
5.  Set up environment variables in Heroku (API keys, etc.).

### Telegram Bot

The Telegram bot requires a Bot Token from BotFather.

1.  Create a bot using BotFather on Telegram.
2.  Obtain the Bot Token.
3.  Set the Bot Token as an environment variable (e.g., `TELEGRAM_BOT_TOKEN`).

#### Running the Bot

The bot should be automatically started from `bot/bot.js` after the backend deployment.

### Mini App

The Telegram Mini App is hosted and served through Heroku alongside the main backend application.  No separate deployment is needed beyond the backend itself.

## Environment Variables

The application requires the following environment variables:

*   `TELEGRAM_BOT_TOKEN`: The Telegram Bot Token.
*   `SOLANA_RPC_URL`: The Solana RPC endpoint URL.
*   Other environment variables used in the backend API, such as database connection strings or API keys.
