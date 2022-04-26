'use strict'

const Database = require('@replit/database')
const { MessageEmbed, Permissions } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const database = new Database(process.env.DB_URL)

require('dotenv').config()

async function run(inter) {
  const users = await database.list()

  const filteredusers = users.filter(value => !value.endsWith('-lastDaily'))
  const list = await Promise.all(filteredusers.map(async id => [id, await database.get(id)]))
  const keysSorted = list.sort(([, a], [, b]) => b - a)

  // Console.log(keysSorted);
  const cutusers = keysSorted.slice(0, 5)

  // Console.log(cutusers)
  const thingy2 = cutusers
    .map(([id, potatoes], index) => `${index + 1}. <@${id}> (${potatoes} 🥔)`)
    .join('\n')

  // Console.log("hi")
  // Console.log(thingy2)
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

module.exports = {
  meta: data,
  run
}
