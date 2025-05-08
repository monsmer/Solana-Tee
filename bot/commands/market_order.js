// bot/commands/market_order.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('market_order')
    .setDescription('Places a market order for Solana tokens.')
    .addStringOption(option =>
      option.setName('token_pair')
        .setDescription('The token pair to trade (e.g., SOL/USDC)')
        .setRequired(true)
    )
    .addNumberOption(option =>
      option.setName('amount')
        .setDescription('The amount of tokens to buy/sell')
        .setRequired(true)
    ),
  async execute(interaction) {
    const tokenPair = interaction.options.getString('token_pair');
    const amount = interaction.options.getNumber('amount');

    // Validate token pair (basic check)
    if (!tokenPair.includes('/')) {
      await interaction.reply({ content: 'Invalid token pair format. Use format SOL/USDC.', ephemeral: true });
      return;
    }

    // Validate amount
    if (amount <= 0) {
      await interaction.reply({ content: 'Amount must be greater than 0.', ephemeral: true });
      return;
    }

    // Placeholder for market order placement logic (using validated inputs)
    await interaction.reply(`Placing market order for ${amount} ${tokenPair}.`);
  },
};
