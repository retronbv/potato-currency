const Database = require("@replit/database")
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
require("dotenv").config()
const db = new Database(process.env.DB_URL)
async function run(inter) {
  const value  = await db.get(inter.user.id) || 0
  const exampleEmbed = new MessageEmbed()
	.setColor('#da9c83')
	.setTitle('/potato amount')
	.setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL()})
	.setDescription(`You have ${value.toString()} potatoes!`)
    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png")
	.setTimestamp()
	.setFooter({ text: `in #${inter.channel.name}`});
  
  await inter.reply({embeds:[exampleEmbed]})
}
const data = new SlashCommandBuilder()
	.setName('amount')
	.setDescription('How many potatoes do you have?')
module.exports = {
  meta:data,
  run:run
}