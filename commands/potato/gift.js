'use strict'

const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const Database = require('@replit/database')

const database = new Database()

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

  const originalUserPotatoes = await database.get(user.id)
  const originalInteractorPotatoes = await database.get(inter.user.id)
  const newUserAmount = originalUserPotatoes + amount
  const newInteractorAmount = originalInteractorPotatoes - amount

  if (amount <= originalInteractorPotatoes) {
    await database.set(user.id, newUserAmount)
    await database.set(inter.user.id, newInteractorAmount)

    const exampleEmbed = new MessageEmbed()
      .setColor('#da9c83')
      .setTitle('/potato gift')
      .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
      .setDescription(
        `${user.toString()} now has **${newUserAmount.toString()} potato${
          newUserAmount <= 1 ? '' : 'es'
        }**! You now have **${newInteractorAmount.toString()} potato${
          newInteractorAmount <= 1 ? '' : 'es'
        }**!`
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
