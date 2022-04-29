'use strict'

const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')
const path = require('path')

const commands = fs
  .readdirSync(path.resolve(__dirname, './potato'))
  .filter(file => path.extname(file) === '.js')
  .map(file => require(path.resolve(__dirname, './potato', `./${file}`)))

function run(inter) {
  const commandName = inter.options.getSubcommand()
  const cmd = commands.find(command => command.meta.name === commandName).run

  cmd(inter)
}

const data = new SlashCommandBuilder().setName('potato').setDescription('Potato Currency')

for (const commandData of commands) {
  const command = commandData.meta.toJSON()

  data.addSubcommand(subcommand => {
    subcommand = subcommand.setName(command.name).setDescription(command.description)

    switch (command.name) {
      case 'remove': {
        subcommand.addUserOption(option =>
          option.setName('user').setDescription('The user to remove').setRequired(true)
        )

        break
      }
      case 'set': {
        subcommand
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

        break
      }
      case 'gift': {
        subcommand
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

        break
      }
      case 'amount': {
        subcommand.addUserOption(option =>
          option.setName('user').setDescription('User to see the amount of.').setRequired(false)
        )
      }
    }

    return subcommand
  })
}

module.exports = { meta: data, run: run }
