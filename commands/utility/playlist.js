const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('playlist')
    .setDescription('Ouça a melhor playlist da década de 80-90'),

  // Execute when an user interact on server
  async execute(interaction) {
    await interaction.reply('https://open.spotify.com/playlist/37i9dQZF1DZ06evO0SdqzC');
  },
};
