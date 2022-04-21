"use strict";
const Database = require("@replit/database")
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const db = new Database()
async function run(inter) {
  let messages = Array.from((await inter.channel.messages.fetch({limit: 1})).values());
  if (messages[0].author.id==inter.client.user.id && messages[0].author.bot && messages[0].content == ":potato:") {
    //console.log(await db.get(inter.user.id))
    let value  = await db.get(inter.user.id) || 0
    await db.set(inter.user.id,value+1)
    value  = await db.get(inter.user.id) || 0
    //console.log(await db.get(inter.user.id))
    let exampleEmbed = new MessageEmbed()
  	.setColor('#da9c83')
  	.setTitle('/potato claim')
  	.setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL()})
  	.setDescription(`You now have ${value.toString()} potatoe${value <= 1 ? "" : "s"}!`)
    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png")
  	.setTimestamp()
  	.setFooter({ text: `in #${inter.channel.name}`});
    await inter.reply({embeds:[exampleEmbed]})
  } else {
    let exampleEmbed = new MessageEmbed()
  	.setColor('#da9c83')
  	.setTitle('/potato claim')
  	.setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL()})
  	.setDescription(`Uhh, there arent any potatoes there...`)
    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png")
  	.setTimestamp()
  	.setFooter({ text: `in #${inter.channel.name}`});
    await inter.reply({embeds:[exampleEmbed]})
  }
  
}
const data = new SlashCommandBuilder()
	.setName('claim')
	.setDescription('Claim that potato!')
module.exports = {
  meta:data,
  run:run
}