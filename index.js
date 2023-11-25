const { Events, Collection } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const { TOKEN } = require('./environments/dotenv');
const { client } = require('./client');
const onlineBot = require('./interactions/onlineBot');

const foldersPath = path.join(__dirname, 'commands');

const commandFolders = fs.readdirSync(foldersPath);

client.commands = new Collection();

commandFolders.forEach((folder) => {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

  commandFiles.forEach((file) => {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ('data' in command && 'execute' in command) {
      return client.commands.set(command.data.name, command);
    }

    return console.log(`Esse comando em ${filePath} não existe`);
  });
});

// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, onlineBot);
