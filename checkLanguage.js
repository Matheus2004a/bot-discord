const languages = require('./languagens.json');

async function checkLanguage(interaction) {
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];

    await interaction.reply(`Documentação do ${selected}: ${languages[selected]}`);
  }
}

module.exports = checkLanguage;
