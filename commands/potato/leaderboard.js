'use strict'

const Database = require('@replit/database')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const db = new Database()

async function run(inter) {
  const users = await db.list()

  const filteredUsers = users.filter(val => !val.endsWith('-lastDaily'))
  const list = await Promise.all(filteredUsers.map(async id => [id, await db.get(id)]))
  const keysSorted = list.sort(([, one], [, two]) => two - one)

  const cutUsers = keysSorted.slice(0, 5)

  const thingy2 = cutUsers
    .map(([id, potatoes], index) => `${index + 1}. <@${id}> (**${potatoes}** 🥔)`)
    .join('\n')

  const exampleEmbed = new MessageEmbed()
    .setColor('#da9c83')
    .setTitle('/potato leaderboard')
    .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL() })
    .setDescription(thingy2)
    .setThumbnail(
      'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png'
    )
    .setTimestamp()
    .setFooter({ text: `in #${inter.channel.name}` })

  await inter.reply({ embeds: [exampleEmbed] })
}

const data = new SlashCommandBuilder()
  .setName('leaderboard')
  .setDescription('Shows top 5 potato collectors!')

module.exports = { meta: data, run: run }
