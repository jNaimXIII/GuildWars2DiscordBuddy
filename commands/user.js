const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('check on a user'),
	async execute(interaction) {
		await interaction.reply(`this command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`);
	},
};
