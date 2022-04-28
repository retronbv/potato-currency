'use strict'

const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const Database = require('@replit/database')

const database = new Database()

async function run(inter) {
  const user = inter.options.getUser('user') || inter.user
  const value = (await database.get(user.id)) || 0

  const person = user.id === inter.user.id ? 'You have' : `${user.toString()} has`
  const exampleEmbed = new MessageEmbed()
    .setColor('#da9c83')
    .setTitle('/potato amount')
    .setAuthor({ iconURL: inter.user.displayAvatarURL(), name: inter.user.tag })
    .setDescription(`${person} ${value.toString()} potato${value === 1 ? '' : 'es'}!`)
    .setThumbnail(
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
    )
    .setTimestamp()
    .setFooter({ text: `in #${inter.channel.name}` })

  await inter.reply({ embeds: [exampleEmbed] })
}

const data = new SlashCommandBuilder()
  .setName('amount')
  .setDescription('How many potatoes do you have?')

module.exports = { meta: data, run: run }
