function probability(n){
  return Math.random() < n;
}

let sinceLast = 0

async function handler(msg) {
  if(msg.author.bot) return;
  let messages = (await msg.channel.messages.fetch({limit: 10})).toJSON();
  let spam = messages.filter((e) => e.author.bot || e.author.id == msg.author.id).length + 1
  if (probability(0.05 * (msg.content.length / 5) * (sinceLast / 2) / spam)) {
    msg.channel.send(":potato:")
    sinceLast = 0
  } else { sinceLast++ }
}

module.exports={
  run:handler
}
