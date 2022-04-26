'use strict'
const Database = require('@replit/database')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const db = new Database(process.env.DB_URL)
require('dotenv').config()
async function run(inter) {
  let cooldown = 84600000

  let lastDaily = await db.get(`${inter.user.id}-lastDaily`)
  var exampleEmbed = new MessageEmbed()
  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    exampleEmbed
      .setColor('#da9c83')
      .setTitle('/potato daily')
      .setAuthor({
        name: inter.user.tag,
        iconURL: inter.user.displayAvatarURL()
      })
      .setDescription(
        `It hasnt been a day, <t:${Math.floor(
          (await db.get(inter.user.id + '-lastDaily')) / 1000 + 86400
        )}:R> you can claim another`
      )
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })
    await inter.reply({ embeds: [exampleEmbed], ephemeral: true })
  } else {
    let value = (await db.get(inter.user.id)) || 0
    await db.set(inter.user.id, value + 1)
    value = (await db.get(inter.user.id)) || 0
    await db.set(`${inter.user.id}-lastDaily`, Date.now())
    //console.log(await db.get(inter.user.id))
    exampleEmbed
      .setColor('#da9c83')
      .setTitle('/potato daily')
      .setAuthor({
        name: inter.user.tag,
        iconURL: inter.user.displayAvatarURL()
      })
      .setDescription(
        `You claimed your daily potato! You now have ${value.toString()} potato${
          value <= 1 ? '' : 'es'
        }!`
      )
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })
    await inter.reply({ embeds: [exampleEmbed] })
  }
}
const data = new SlashCommandBuilder().setName('daily').setDescription('Claim your daily potato!')
module.exports = {
  meta: data,
  run: run
}
