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
  const amount = inter.options.getInteger('amount') || await db.get(user.id);
  const daily_date = inter.options.getInteger('daily') || await db.get(user.id + "-lastDaily");
  await db.set(`${user.id}`,amount)
  await db.set(`${user.id}-lastDaily`, daily_date)
  const exampleEmbed = new MessageEmbed()
  .setColor('#da9c83')
  .setTitle('/potato set')
  .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL()})
  .setDescription(`Set <@${user.id}>'s potatoes to **${amount} :potato:** and their last daily claim to <t:${daily_date}:R>!`)
    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png")
  .setTimestamp()
  .setFooter({ text: `in #${inter.channel.name}`});
  await inter.reply({embeds:[exampleEmbed]})
}
const data = new SlashCommandBuilder()
	.setName('set')
	.setDescription('(Mods Only) Set a user\'s potato count.')
  .addUserOption(option =>
		option.setName('user')
			.setDescription('The user to set')
			.setRequired(false));
module.exports = {
  meta:data,
  run:run
}