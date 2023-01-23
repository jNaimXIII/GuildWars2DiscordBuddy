const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('discord.js');
const { gw2 } = require('../helpers/api/gw2');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('item')
		.setDescription('get random item information'),
	async execute(interaction) {
		await interaction.deferReply();

		const itemIds = await gw2.items().ids();
		const randomItemId = itemIds[Math.floor(Math.random() * itemIds.length)];

		const randomItem = await gw2.items().get(randomItemId);

		const embed = new EmbedBuilder()
			.setTitle(randomItem.name + ' [' + randomItem.rarity + ']')
			.setDescription(randomItem.description || null)
			.setThumbnail(randomItem.icon)
			.addFields(
				{ name: 'GAME TYPES', value: randomItem.game_types.join(', ') },
				{ name: 'FLAGS', value: randomItem.flags.join(', ') },
				{ name: 'RESTRICTIONS', value: randomItem.restrictions.join(', ') || 'NONE' },
			);

		await interaction.editReply({ embeds: [embed] });
	},
};
