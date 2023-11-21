const languages = require('../languagens.json');

async function checkLanguage(interaction) {
  if (interaction.isStringSelectMenu()) {
    const selected = interaction.values[0];

    await interaction.reply(languages[selected]
      ? `Documentação do ${selected} ${languages[selected]}`
      : 'Documentação não linkada');
  }
}

module.exports = checkLanguage;
