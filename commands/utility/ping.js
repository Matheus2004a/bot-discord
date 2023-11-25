const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde pong'),

  // Execute when an user interact on server
  async execute(interaction) {
    await interaction.reply('Pong');
  },
};
