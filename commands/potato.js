const { Builders } = require("beeptools")
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require("fs")
async function help(inter) {
  var cmd = require(__dirname + '/potato/' + inter.options.getSubcommand() + '.js').run;
    cmd(inter);
}
const subcommands = [];
const commandFiles = fs.readdirSync(__dirname+"/potato/").filter(file => file.endsWith('.js'));
console.log(commandFiles)
for (const file of commandFiles) {
    const command = require(`${__dirname}/potato/${file}`);
  //console.log(command)
  //console.log(command.meta)
    subcommands.push(command.meta.toJSON());
}
const data = new SlashCommandBuilder()
	.setName('potato')
	.setDescription('Potato Currency')
for (const command of subcommands) {
    data.addSubcommand(subcommand=>
      subcommand
        .setName(command.name)
        .setDescription(command.description))
}
/*
.addSubcommand(subcommand =>
		subcommand
			.setName('amount')
			.setDescription('How many potatoes do you have?'))
	.addSubcommand(subcommand =>
		subcommand
			.setName('daily')
			.setDescription('Claim your daily potato'));
*/
command = {
  meta:data,
  run:help
}
module.exports = command
