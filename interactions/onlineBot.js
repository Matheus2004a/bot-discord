const checkLanguage = require('./checkLanguage');

async function onlineBot(interaction) {
  if (!interaction.isCommand()) return;

  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'docs') {
    checkLanguage(interaction);
  }

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('Houve um erro ao executar esse comando');
  }
}

module.exports = onlineBot;
