const dotenv = require('dotenv');

dotenv.config();

const { TOKEN, CLIENT_ID, GUILD_ID } = process.env;

module.exports = {
  TOKEN,
  CLIENT_ID,
  GUILD_ID,
};
