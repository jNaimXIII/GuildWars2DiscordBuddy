const { REST, Routes } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');

const { config } = require('dotenv');
config(path.join(__dirname, '../../.env'));

const commands = [];
const commandFiles = fs.readdirSync(path.join(__dirname, '../../commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(path.join(__dirname, '../../commands', file));
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
	try {
		console.log(`started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID),
			{ body: commands },
		);

		console.log(`successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.error(error);
	}
})();
