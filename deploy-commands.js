const { REST, Routes } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const { TOKEN, CLIENT_ID, GUILD_ID } = require('./environments/dotenv');
const { commands } = require('./client');

const foldersPath = path.join(__dirname, 'commands');

const commandFolders = fs.readdirSync(foldersPath);

commandFolders.forEach((folder) => {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

  commandFiles.forEach((file) => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      return commands.push(command.data.toJSON());
    }

    return console.log(`Esse comando em ${filePath} não existe`);
  });
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
