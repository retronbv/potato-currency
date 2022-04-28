'use strict'

// eslint-disable-next-line fp/no-let -- We need this to change.
let sinceLast = 0

async function handler(message) {
  if (message.author.bot) {
    return
  }

  const messages = await message.channel.messages.fetch({ limit: 10 })
  const spam =
    messages
      .toJSON()
      .filter(current => current.author.bot || current.author.id === message.author.id).length + 1

  if (
    Math.random() <
    (0.01 * (message.cleanContent.length / 50 + 1) * (sinceLast / 3)) / (spam * 2)
  ) {
    message.channel.send(':potato:')
    sinceLast = 0
  } else {
    sinceLast++
  }
}

module.exports = { run: handler }
