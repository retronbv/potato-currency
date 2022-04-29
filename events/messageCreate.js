'use strict'

// eslint-disable-next-line fp/no-let -- We need this to change.
let sinceLast = 0

async function handler(msg) {
  if (msg.author.bot || !msg.guild) return

  const messages = await msg.channel.messages.fetch({ limit: 10 })
  const spam =
    messages.toJSON().filter(current => current.author.bot || current.author.id === msg.author.id)
      .length + 1

  if (Math.random() < (0.01 * (msg.cleanContent.length / 50 + 2) * (sinceLast / 3)) / (spam * 2)) {
    msg.channel.send(':potato:')
    sinceLast = 0
  } else {
    sinceLast++
  }
}

module.exports = { run: handler }
