// bot/commands/balance.js
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('Checks your Solana balance.')
    .addStringOption(option =>
      option.setName('wallet_address')
        .setDescription('Your Solana wallet address (optional)')
        .setRequired(false)
    ),
  async execute(interaction) {
    const walletAddress = interaction.options.getString('wallet_address');

    // Validate wallet address (basic regex)
    if (walletAddress && !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletAddress)) {
      await interaction.reply({ content: 'Invalid Solana wallet address.', ephemeral: true });
      return;
    }

    // Placeholder for balance check logic (using validated walletAddress if provided)
    if (walletAddress) {
      await interaction.reply(`Checking balance for wallet address: ${walletAddress}`);
    } else {
      await interaction.reply('Checking your default wallet balance.');
    }
  },
};
