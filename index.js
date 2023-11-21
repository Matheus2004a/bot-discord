const {
  Client, Events, GatewayIntentBits, Collection,
} = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');

const { TOKEN } = require('./environments/dotenv');
const onlineBot = require('./interactions/onlineBot');

const commandsPath = path.join(__dirname, 'commands');

// Filter all files .js on directory commands
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

commandFiles.forEach((file) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ('data' in command && 'execute' in command) {
    return client.commands.set(command.data.name, command);
  }

  return console.log(`Esse comando em ${filePath} não existe`);
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, onlineBot);
