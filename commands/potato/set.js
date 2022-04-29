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
  const amount = inter.options.getInteger('amount') ?? (await db.get(user.id)) ?? 0
  const dailyDate = new Date(
    inter.options.getInteger('daily') ?? (await db.get(`${user.id}-lastDaily`))
  )

  await db.set(`${user.id}`, amount)
  await db.set(`${user.id}-lastDaily`, dailyDate / 1)

  const exampleEmbed = new MessageEmbed()
    .setColor('#da9c83')
    .setTitle('/potato set')
    .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
    .setDescription(
      `Set ${user.toString()}'s potatoes to **${amount} :potato:** and their last daily claim to **<t:${Math.floor(
        dailyDate / 1000
      )}:R>**!`
    )
    .setThumbnail(
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
    )
    .setTimestamp()
    .setFooter({ text: `in #${inter.channel.name}` })

  await inter.reply({ embeds: [exampleEmbed] })
}

const data = new SlashCommandBuilder()
  .setName('set')
  .setDescription("(Mods Only) Set a user's potato count.")
  .addUserOption(option =>
    option.setName('user').setDescription('The user to set').setRequired(false)
  )

module.exports = { meta: data, run: run }
