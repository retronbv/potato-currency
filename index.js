'use strict'

require('dotenv').config()

const path = require('path')
const { Client } = require('discord.js')
const beeptools = require('beeptools')

beeptools.KeepAlive()

new Client({
  intents: [
    'GUILDS',
    'GUILD_MESSAGES',
    'GUILD_MESSAGE_REACTIONS',
    'DIRECT_MESSAGES',
    'GUILD_MEMBERS',
    'GUILD_BANS',
    'GUILD_EMOJIS_AND_STICKERS',
    'GUILD_INTEGRATIONS',
    'GUILD_WEBHOOKS',
    'GUILD_INVITES',
    'GUILD_VOICE_STATES',
    'GUILD_PRESENCES',
    'GUILD_MESSAGE_TYPING',
    'DIRECT_MESSAGE_REACTIONS',
    'DIRECT_MESSAGE_TYPING',
    'GUILD_SCHEDULED_EVENTS'
  ],

  partials: ['USER', 'MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'GUILD_SCHEDULED_EVENT']
})
  .on('ready', client => {
    client.guilds.cache.forEach(guild => {
      beeptools.RegisterSlash(
        process.env.TOKEN,
        guild.id,
        client.application.id,
        path.resolve(__dirname,'./commands')
      )
    })
    console.log('im in :)')
  })
  .on('guildCreate', guild => {
    beeptools.RegisterSlash(
      process.env.TOKEN,
      guild.id,
      guild.client.application.id,
        path.resolve(__dirname,'./commands')
    )
  })
  .on('interactionCreate', interaction => {
    if (interaction.isCommand()) {
       
      const cmd = require( path.resolve(__dirname,'./commands',`./${interaction.commandName}.js`)).run

      cmd(interaction)
    }
  })
  .on('messageCreate', async message => {
    if (message.partial) {
      message = await message.fetch()
    }

    const cmd = require(path.resolve(__dirname,'./commands','./messageCreate.js')).run

    cmd(message)
  })
  .login(process.env.TOKEN)
