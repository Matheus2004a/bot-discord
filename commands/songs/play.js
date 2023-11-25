const { useMainPlayer } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('play a song from YouTube.')
    .addSubcommand((subcommand) => subcommand
      .setName('search')
      .setDescription('Searches for a song and plays it')
      .addStringOption((option) => option.setName('searchterms').setDescription('search keywords').setRequired(true)))
    .addSubcommand((subcommand) => subcommand
      .setName('playlist')
      .setDescription('Plays a playlist from YT')
      .addStringOption((option) => option.setName('url').setDescription("the playlist's url").setRequired(true)))
    .addSubcommand((subcommand) => subcommand
      .setName('song')
      .setDescription('Plays a single song from YT')
      .addStringOption((option) => option.setName('url').setDescription("the song's url").setRequired(true))),
  async execute(interaction) {
    const player = useMainPlayer();

    const { channel } = interaction.member.voice;

    if (!channel) return interaction.reply('You are not connected to a voice channel!'); // make sure we have a voice channel

    const query = interaction.options.getString('query', true); // we need input/query to play

    // let's defer the interaction as things can take time to process
    await interaction.deferReply();

    try {
      const { track } = await player.play(channel, query, {
        nodeOptions: {
          // nodeOptions are the options for guild node (aka your queue in simple word)
          metadata: interaction, // we can access this metadata object using queue.metadata later on
        },
      });

      return interaction.followUp(`**${track.title}** enqueued!`);
    } catch (e) {
      // let's return error if something failed
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
