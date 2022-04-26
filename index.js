const { Client, Intents } = require('discord.js')
require('dotenv').config()
const client = new Client({
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
  partials: [
    'USER',
    'MESSAGE',
    'CHANNEL',
    'GUILD_MEMBER',
    'REACTION',
    'GUILD_SCHEDULED_EVENT'
  ]
})
const beeptools = require('beeptools')
beeptools.KeepAlive()
client.on('ready', async () => {
  client.guilds.cache.forEach(guild => {
    beeptools.RegisterSlash(
      process.env.TOKEN,
      guild.id,
      client.application.id,
      __dirname + '/commands'
    )
  })
  console.log('im in :)')
})
client.on('guildCreate', guild => {
  beeptools.RegisterSlash(
    process.env.TOKEN,
    guild.id,
    client.application.id,
    __dirname + '/commands'
  )
})

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    var cmd = require(__dirname +
      '/commands/' +
      interaction.commandName +
      '.js').run
    cmd(interaction)
  }
})
client.on('messageCreate', async message => {
  if (message.partial) message = await message.fetch()
  var cmd = require(__dirname + '/events/messageCreate').run
  cmd(message)
})
client.login(process.env.TOKEN)
