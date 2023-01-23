const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { gw2, gw2base } = require('../helpers/api/gw2');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('guild')
		.setDescription('get guild information')
		.addStringOption(option => option.setName('guild').setDescription('guild name')),
	async execute(interaction) {
		const queryGuildName = interaction.options.getString('guild') ?? null;

		let embed;

		if (queryGuildName) {
			const guildId = await gw2.guild().search().name(queryGuildName);


			if (!guildId) return await interaction.reply('no guild found');


			const guild = await gw2base.guild().get(guildId);
			const emblem = await gw2base.emblem().foregrounds().get(guild.emblem.foreground.id);

			embed = new EmbedBuilder()
				.setColor(guild.emblem.foreground.colors[0])
				.setTitle(guild.name + ' [' + guild.tag + ']')
				.setThumbnail(emblem.layers[0]);
		}
		else {
			const GUILD_WARS_GUILD_ID = process.env.GUILD_WARS_GUILD_ID;

			const guild = await gw2.guild().get(GUILD_WARS_GUILD_ID);
			const emblem = await gw2.emblem().foregrounds().get(guild.emblem.foreground.id);

			embed = new EmbedBuilder()
				.setColor(guild.emblem.foreground.colors[0])
				.setTitle(guild.name + ' [' + guild.tag + ']')
				.setDescription(guild.motd)
				.setThumbnail(emblem.layers[0])
				.addFields(
					{ name: '\u200B', value: '\u200B' },
					{ name: 'LEVEL', value: String(guild.level), inline: true },
					{ name: 'MEMBERS', value: String(guild.member_count) + '/' + guild.member_capacity, inline: true },
					{ name: 'INFLUENCE', value: String(guild.influence), inline: true },
				);
		}

		await interaction.reply({ embeds: [embed] });
	},
};
