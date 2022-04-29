'use strict'

require('dotenv').config()

const { Client, Intents } = require('discord.js')
const path = require('path')
const beeptools = require('beeptools')

beeptools.KeepAlive()

new Client({
  intents: Object.values(Intents.FLAGS),

  partials: ['USER', 'MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'GUILD_SCHEDULED_EVENT']
})
  .on('ready', client => {
    client.guilds.cache.forEach(guild => {
      beeptools.RegisterSlash(
        process.env.TOKEN,
        guild.id,
        client.application.id,
        path.resolve(__dirname, './commands')
      )
    })
    console.log('im in :)')
  })
  .on('guildCreate', guild => {
    beeptools.RegisterSlash(
      process.env.TOKEN,
      guild.id,
      guild.client.application.id,
      path.resolve(__dirname, './commands')
    )
  })
  .on('interactionCreate', interaction => {
    if (interaction.isCommand()) {
      const cmd = require(path.resolve(
        __dirname,
        './commands',
        `./${interaction.commandName}.js`
      )).run

      cmd(interaction)
    }
  })
  .on('messageCreate', async message => {
    if (message.partial) message = await message.fetch()

    const cmd = require(path.resolve(__dirname, './events', './messageCreate.js')).run

    cmd(message)
  })
  .login(process.env.TOKEN)
