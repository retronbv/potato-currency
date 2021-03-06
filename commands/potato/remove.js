'use strict'

const Database = require('@replit/database')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const db = new Database()

async function run(inter) {
  const { application } = inter.client

  if (inter.user.id !== (application.partial ? await application.fetch() : application).owner.id) {
    await inter.reply({ content: "Sorry, you don't have permissions to do this!", ephemeral: true })

    return
  }

  const user = inter.options.getUser('user') || inter.user

  await db.delete(`${user.id}`)
  await db.delete(`${user.id}-lastDaily`)

  const exampleEmbed = new MessageEmbed()
    .setColor('#da9c83')
    .setTitle('/potato remove')
    .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
    .setDescription(`Removed ${user.toString()}'s data.`)
    .setThumbnail(
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
    )
    .setTimestamp()
    .setFooter({ text: `in #${inter.channel.name}` })

  await inter.reply({ embeds: [exampleEmbed] })
}

const data = new SlashCommandBuilder()
  .setName('remove')
  .setDescription('(Mods Only) Remove a users data in the potato bot.')
  .addUserOption(option =>
    option.setName('user').setDescription('The user to remove').setRequired(false)
  )

module.exports = { meta: data, run: run }
