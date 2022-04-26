'use strict'

const Database = require('@replit/database')
const { MessageEmbed, Permissions } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const database = new Database(process.env.DB_URL)

require('dotenv').config()

async function run(inter) {
  const user = inter.options.getUser('user')
  const amount = inter.options.getInteger('amount')

  if (user.id === inter.user.id || user.bot) {
    return await inter.reply({
      ephemeral: true,

      embeds: [
        new MessageEmbed()
          .setColor('#da9c83')
          .setTitle('/potato gift')
          .setAuthor({
            name: inter.user.tag,
            iconURL: inter.user.displayAvatarURL()
          })
          .setDescription("You can't give potatoes to that user!")
          .setThumbnail(
            'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
          )
          .setTimestamp()
          .setFooter({ text: `in #${inter.channel.name}` })
      ]
    })
  }

  const user_amount = await database.get(user.id)
  const interactor_amount = await database.get(inter.user.id)
  const new_user_amount = user_amount + amount
  const new_interactor_amount = interactor_amount - amount

  let exampleEmbed = new MessageEmbed()

  if (amount <= interactor_amount) {
    await database.set(user.id, new_user_amount)
    await database.set(inter.user.id, new_interactor_amount)

    // Await db.set(`${user.id}`,0)
    // Await db.set(`${user.id}-lastDaily`, 0)

    exampleEmbed = exampleEmbed
      .setColor('#da9c83')
      .setTitle('/potato gift')
      .setAuthor({
        name: inter.user.tag,
        iconURL: inter.user.displayAvatarURL()
      })
      .setDescription(
        `<@${user.id}> now has **${new_user_amount.toString()} potato${
          new_user_amount <= 1 ? '' : 'es'
        }**! You now have **${new_interactor_amount.toString()} potato${
          new_interactor_amount <= 1 ? '' : 'es'
        }**!`
      )
      .setThumbnail(
        'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
      )
      .setTimestamp()
      .setFooter({ text: `in #${inter.channel.name}` })
    await inter.reply({ embeds: [exampleEmbed] })
  } else {
    exampleEmbed = exampleEmbed
      .setColor('#da9c83')
      .setTitle('/potato gift')
      .setAuthor({
        name: inter.user.tag,
        iconURL: inter.user.displayAvatarURL()
      })
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

module.exports = {
  meta: data,
  run
}
