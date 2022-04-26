'use strict'

const Database = require('@replit/database')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

require('dotenv').config()

const database = new Database(process.env.DB_URL)

async function run(inter) {
  const messages = Array.from((await inter.channel.messages.fetch({ limit: 6 })).values())
  const filtered = messages.filter(
    message => message.author.id == inter.client.user.id && message.content == ':potato:'
  )

  filtered.forEach(async message =>
    message.edit(`~~:potato:~~ - Claimed by <@${inter.user.id}>`).catch(error => {
      console.error(error)
    })
  )

  if (filtered.length > 0) {
    // Console.log(await db.get(inter.user.id))
    const value = ((await database.get(inter.user.id)) || 0) + filtered.length

    await database.set(inter.user.id, value)

    // Console.log(await db.get(inter.user.id))
    const exampleEmbed = new MessageEmbed()
      .setColor('#da9c83')
      .setTitle('/potato claim')
      .setAuthor({
        name: inter.user.tag,
        iconURL: inter.user.displayAvatarURL()
      })
      .setDescription(`You now have ${value.toString()} potato${value === 1 ? '' : 'es'}!`)
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })

    await inter.reply({ embeds: [exampleEmbed] })
  } else {
    const exampleEmbed = new MessageEmbed()
      .setColor('#da9c83')
      .setTitle('/potato claim')
      .setAuthor({
        name: inter.user.tag,
        iconURL: inter.user.displayAvatarURL()
      })
      .setDescription('Uhh, there arent any potatoes there...')
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })

    await inter.reply({ ephemeral: true, embeds: [exampleEmbed] })
  }
}

const data = new SlashCommandBuilder().setName('claim').setDescription('Claim that potato!')

module.exports = {
  meta: data,
  run
}
