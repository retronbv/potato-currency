function probability(n) {
  return Math.random() < n
}

let sinceLast = 0

async function handler(message) {
  if (message.author.bot) {
    return
  }

  const messages = (await message.channel.messages.fetch({ limit: 6 })).toJSON()
  const spam = messages.filter(e => e.author.bot || e.author.id == message.author.id).length + 1

  if (probability((0.01 * (message.cleanContent.length / 50 + 1) * (sinceLast / 3)) / (spam * 2))) {
    message.channel.send(':potato:')
    sinceLast = 0
  } else {
    sinceLast++
  }
}

module.exports = {
  run: handler
}
