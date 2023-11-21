const checkLanguage = require('./checkLanguage');

async function onlineBot(interaction) {
  checkLanguage(interaction);

  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.error('Comando não encontrado');
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply('Houve um erro ao executar esse comando');
  }
}

module.exports = onlineBot;
