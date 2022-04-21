"use strict";
const Database = require("@replit/database")
const { MessageEmbed,Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const db = new Database(process.env.DB_URL)
require("dotenv").config()
async function run(inter) {
  if (!inter.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
    await inter.reply({content: 'Sorry, you don\'t have permissions to do this!', ephemeral: true});
    return;
  }
  const user = inter.options.getUser('user') || inter.user;
  await db.set(`${user.id}`,0)
  await db.set(`${user.id}-lastDaily`, 0)
  const exampleEmbed = new MessageEmbed()
  .setColor('#da9c83')
  .setTitle('/potato reset')
  .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL()})
  .setDescription(`Reset ${user.tag}'s potatoes and \`/potato daily\` cooldown!`)
    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png")
  .setTimestamp()
  .setFooter({ text: `in #${inter.channel.name}`});
  await inter.reply({embeds:[exampleEmbed]})
}
const data = new SlashCommandBuilder()
	.setName('reset')
	.setDescription('(Mods Only) Reset a user\' potato count and their daily cooldown.')
  .addUserOption(option =>
		option.setName('user')
			.setDescription('The user to reset')
			.setRequired(false));
module.exports = {
  meta:data,
  run:run
}