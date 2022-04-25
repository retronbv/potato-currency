function probability(n){
  return Math.random() < n;
}

async function handler(msg) {
  if(msg.author.bot) return;
  let messages = Array.from((await msg.channel.messages.fetch({limit: 6})).values());
  let spam = messages.every((e)=>{
    return e.author.id == msg.author.id
  })
  if (probability(0.05) && msg.content.length >= 5 && !spam) {
    msg.channel.send(":potato:")
  }
}

module.exports={
  run:handler
}