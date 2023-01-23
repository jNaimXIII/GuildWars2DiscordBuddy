const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('check on the bot'),
	async execute(interaction) {
		await interaction.reply('Soup!');
	},
};
