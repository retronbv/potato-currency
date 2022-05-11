'use strict'

const Database = require('@replit/database')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const db = new Database()

async function run(inter) {
  const cooldown = 84_600_000

  const lastDaily = await db.get(`${inter.user.id}-lastDaily`)

  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    const exampleEmbed = new MessageEmbed()
      .setColor('#da9c83')
      .setTitle('/potato daily')
      .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
      .setDescription(
        `It hasnt been a day! You can claim another daily potato **<t:${Math.floor(
          ((await db.get(`${inter.user.id}-lastDaily`)) + cooldown) / 1000
        )}:R>**.`
      )
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })

    await inter.reply({ embeds: [exampleEmbed], ephemeral: true })
  } else {
    const value = ((await db.get(inter.user.id)) || 0) + 1

    await db.set(inter.user.id, value)
    await db.set(`${inter.user.id}-lastDaily`, Date.now())

    const exampleEmbed = new MessageEmbed()
      .setColor('#da9c83')
      .setTitle('/potato daily')
      .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
      .setDescription(`You claimed your daily potato! You now have **${value}** :potato:!`)
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
