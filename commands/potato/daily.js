'use strict'

const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const Database = require('@replit/database')

const database = new Database()

async function run(inter) {
  const cooldown = 84_600_000

  const lastDaily = await database.get(`${inter.user.id}-lastDaily`)

  const exampleEmbed = new MessageEmbed()

  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    exampleEmbed
      .setColor('#da9c83')
      .setTitle('/potato daily')
      .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
      .setDescription(
        `It hasnt been a day, <t:${Math.floor(
          ((await database.get(`${inter.user.id}-lastDaily`)) + cooldown) / 1000
        )}:R> you can claim another`
      )
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })
    await inter.reply({ embeds: [exampleEmbed], ephemeral: true })
  } else {
    const value = ((await database.get(inter.user.id)) || 0) + 1

    await database.set(inter.user.id, value)
    await database.set(`${inter.user.id}-lastDaily`, Date.now())

    exampleEmbed
      .setColor('#da9c83')
      .setTitle('/potato daily')
      .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
      .setDescription(
        `You claimed your daily potato! You now have ${value.toString()} potato${
          value === 1 ? '' : 'es'
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

module.exports = { meta: data, run: run }
