const fs = require('node:fs');
const path = require('node:path');

const { config } = require('dotenv');
config(path.join(__dirname, '../.env'));

const { Client, GatewayIntentBits, Collection } = require('discord.js');

const discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

const eventsPath = path.join(__dirname, '../events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		discordClient.once(event.name, (...args) => event.execute(...args));
	}
	else {
		discordClient.on(event.name, (...args) => event.execute(...args));
	}
}


discordClient.commands = new Collection();

const commandsPath = path.join(__dirname, '../commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	if ('data' in command && 'execute' in command) {
		discordClient.commands.set(command.data.name, command);
	}
	else {
		console.log(`[WARNING] the command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}


const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
discordClient.login(DISCORD_BOT_TOKEN).then(() => console.log('logged in'));
