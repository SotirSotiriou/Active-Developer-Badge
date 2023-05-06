const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
commandArray = [];

require('dotenv');
if (!process.env.token) {
  console.error(`[ERROR] Please enter your bot's token inside the .env file.`);
  process.exit(1);
} else if (!process.env.client_id) {
  console.error(`[ERROR] Please enter your bot's client ID inside your .env file.`);
  process.exit(1);
}
client.login(process.env.token);

const command = new SlashCommandBuilder()
.setName('obtain')
.setDescription("Run to obtain the badge.")
commandArray.push(command.toJSON());

const rest = new REST({
  version: '9'
}).setToken(process.env.token);

(async () => {
  try {
    console.log('[INFO] Loading command.');
    await rest.put(
      Routes.applicationCommands(process.env.client_id), {
        body: commandArray
      }
    );

    console.log('[INFO] Command successfully loaded.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('ready', () => {
  console.log(`[INFO] Logged on as ${client.user.tag}`);
  console.log(`[INFO] Invite your bot to you server: https://discord.com/api/oauth2/authorize?client_id=${process.env.client_id}&permissions=8&scope=applications.commands%20bot`)
  console.log(`[INFO] Run '/obtain' to obtain the badge.`);
});

client.on('interactionCreate', (interaction) => {
  if (!interaction.isCommand()) return;
  interaction.reply({ content: `Successfully obtained! To be 100% sure that you will get the badge tell a friend to run this conmand for 2-3 times.\n!!  REMEMBER: Community mode must be enabled on this server for this to actually work\nNow wait 15hr and then go to the discord application portal and you should see a claim message.\n\nIf you want an advanced discord bot for your server you should use Rushly.\nInvite it here: https://rushly.xyz`})
});
