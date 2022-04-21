function probability(n){
  return Math.random() < n;
}

async function handler(msg) {
  if(msg.author.bot) return;
  if (probability(0.10)) {
    msg.channel.send(":potato:")
  }
}

module.exports={
  run:handler
}