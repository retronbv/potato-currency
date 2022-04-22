"use strict";
Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}
const Database = require("@replit/database")
const { MessageEmbed,Permissions } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const db = new Database(process.env.DB_URL)
require("dotenv").config()
async function run(inter) {
  let users = await db.list()
  let filteredusers = users.filter(val=> !val.endsWith("-lastDaily"))
  //console.log(filteredusers)
  const fetchUser = async id => await db.get(id)
  let sortedusers = filteredusers.sort()
  var list = {}
  for (let x = 0; x < sortedusers.length; x++) {
    list[sortedusers[x]] = await fetchUser(sortedusers[x])
  }
  /*
  sortedusers.forEach(async (k)=>{
    let v = await db.get(k);
    //console.log(k,v)
    list[k] = v
  })
  */
  let keysSorted = Object.values(list).sort(function(a,b){return b-a})
  //console.log(keysSorted);
  let cutusers= keysSorted.slice(0, 5)
  //console.log(cutusers)
  var thingy2 = cutusers.map((potatoes, index)=>`${(index)+1}. <@${list.getKeyByValue(potatoes)}> (${potatoes} 🥔)`).join("\n");
  //console.log("hi")
  //console.log(thingy2)
  const exampleEmbed = new MessageEmbed()
  .setColor('#da9c83')
  .setTitle('/potato leaderboard')
  .setAuthor({ name: inter.user.tag, iconURL: inter.user.displayAvatarURL()})
  .setDescription(thingy2)
    .setThumbnail("https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/potato_1f954.png")
  .setTimestamp()
  .setFooter({ text: `in #${inter.channel.name}`});
  await inter.reply({embeds:[exampleEmbed]})
}
const data = new SlashCommandBuilder()
	.setName('leaderboard')
	.setDescription('Shows top 5 potato collectors!')
module.exports = {
  meta:data,
  run:run
}