const { REST, Routes } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const { TOKEN, CLIENT_ID, GUILD_ID } = require('./environments/dotenv');

const commandsPath = path.join(__dirname, 'commands');

const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

const commands = [];

commandFiles.forEach((file) => {
  const command = require(`./commands/${file}`);

  commands.push(command.data.toJSON());
});

const rest = new REST().setToken(TOKEN);

(async () => {
  try {
    console.log(`Resetando ${commands.length} comando(s)`);

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log('Comandos registrados com sucesso');
  } catch (error) {
    console.error(error);
  }
})();
