const { Builders } = require('beeptools')
const { MessageEmbed } = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')

async function help(inter) {
  const cmd = require(`${__dirname}/potato/${inter.options.getSubcommand()}.js`).run

  cmd(inter)
}

const subcommands = []
const commandFiles = fs.readdirSync(`${__dirname}/potato/`).filter(file => file.endsWith('.js'))

console.log(commandFiles)

for (const file of commandFiles) {
  const command = require(`${__dirname}/potato/${file}`)

  // Console.log(command)
  // Console.log(command.meta)
  subcommands.push(command.meta.toJSON())
}

const data = new SlashCommandBuilder().setName('potato').setDescription('Potato Currency')

for (const command of subcommands) {
  // Console.log(command)
  if (command.name == 'remove') {
    data.addSubcommand(subcommand =>
      subcommand
        .setName(command.name)
        .setDescription(command.description)
        .addUserOption(option =>
          option.setName('user').setDescription('The user to remove').setRequired(true)
        )
    )
  } else if (command.name == 'set') {
    data.addSubcommand(subcommand =>
      subcommand
        .setName(command.name)
        .setDescription(command.description)
        .addUserOption(option =>
          option.setName('user').setDescription('The user to set').setRequired(true)
        )
        .addIntegerOption(option =>
          option.setName('amount').setDescription('The amount of potatoes').setRequired(false)
        )
        .addIntegerOption(option =>
          option
            .setName('daily')
            .setDescription('The last claim of daily potato')
            .setRequired(false)
        )
    )
  } else if (command.name == 'gift') {
    data.addSubcommand(subcommand =>
      subcommand
        .setName(command.name)
        .setDescription(command.description)
        .addUserOption(option =>
          option.setName('user').setDescription('User to gift to.').setRequired(true)
        )
        .addIntegerOption(option =>
          option
            .setName('amount')
            .setDescription('Amount of potatoes to gift.')
            .setRequired(true)
            .setMinValue(1)
        )
    )
  } else if (command.name == 'amount') {
    data.addSubcommand(subcommand =>
      subcommand
        .setName(command.name)
        .setDescription(command.description)
        .addUserOption(option =>
          option.setName('user').setDescription('User to see the amount of.').setRequired(false)
        )
    )
  } else {
    data.addSubcommand(subcommand =>
      subcommand.setName(command.name).setDescription(command.description)
    )
  }
}

// Console.log(data)
//
// .addSubcommand(subcommand =>
// Subcommand
// .setName('amount')
// .setDescription('How many potatoes do you have?'))
// .addSubcommand(subcommand =>
// Subcommand
// .setName('daily')
// .setDescription('Claim your daily potato'));
//
command = {
  meta: data,
  run: help
}

module.exports = command
