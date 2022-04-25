"use strict";
const Database = require("@replit/database")
const { MessageEmbed, Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const db = new Database(process.env.DB_URL)
require("dotenv").config()
async function run(inter) {
  let users = await db.list()
  let list = await Promise.all(users.filter(val=> !val.endsWith("-lastDaily")).map(async (id)=>[id, await db.get(id)]))
  let cutusers = list.sort(([,a], [,b]) => b - a).slice(0, 5)
  const exampleEmbed = new MessageEmbed()
  .setColor('#da9c83')
  .setTitle('/potato leaderboard')
  .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL()})
  .setDescription(cutusers.map(([id, potatoes], index)=>`${(index)+1}. <@${id}> (${potatoes} 🥔)`).join("\n"))
    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png")
  .setTimestamp()
  .setFooter({ text: `in #${inter.channel.name}`});
  await inter.reply({embeds:[exampleEmbed]})
}
const data = new SlashCommandBuilder()
	.setName('leaderboard')
	.setDescription('Shows top 5 potato collectors!')
module.exports = {
  meta:data,
  run:run
}
