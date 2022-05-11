'use strict'

const Database = require('@replit/database')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const db = new Database()

async function run(inter) {
  const user = inter.options.getUser('user')
  const amount = inter.options.getInteger('amount')

  if (user.id === inter.user.id || user.bot) {
    return inter.reply({
      ephemeral: true,

      embeds: [
        new MessageEmbed()
          .setColor('#da9c83')
          .setTitle('/potato gift')
          .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
          .setDescription("You can't give potatoes to that user!")
          .setThumbnail(
            'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
          )
          .setTimestamp()
          .setFooter({ text: `in #${inter.channel.name}` })
      ]
    })
  }

  const originalUserPotatoes = await db.get(user.id)
  const originalInteractorPotatoes = await db.get(inter.user.id)
  const newUserAmount = originalUserPotatoes + amount
  const newInteractorAmount = originalInteractorPotatoes - amount

  if (amount <= originalInteractorPotatoes) {
    await db.set(user.id, newUserAmount)
    await db.set(inter.user.id, newInteractorAmount)

    const exampleEmbed = new MessageEmbed()
      .setColor('#da9c83')
      .setTitle('/potato gift')
      .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
      .setDescription(
        `${user.toString()} now has **${newUserAmount} :potato:**! You now have **${newInteractorAmount} :potato:**!`
      )
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })

    await inter.reply({ embeds: [exampleEmbed] })
  } else {
    const exampleEmbed = new MessageEmbed()
      .setColor('#da9c83')
      .setTitle('/potato gift')
      .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
      .setDescription('Uhh, you dont have that many potatoes...')
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })

    await inter.reply({ ephemeral: true, embeds: [exampleEmbed] })
  }
}

const data = new SlashCommandBuilder()
  .setName('gift')
  .setDescription('Gift your potatoes to another user')
  .addUserOption(option =>
    option.setName('user').setDescription('User to gift to.').setRequired(true)
  )
  .addUserOption(option =>
    option.setName('amount').setDescription('Amount of potatoes to gift.').setRequired(true)
  )

module.exports = { meta: data, run: run }
