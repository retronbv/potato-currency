'use strict'

const { SlashCommandBuilder } = require('@discordjs/builders')
const fs = require('fs')

function run(inter) {
  const cmd = require(`${__dirname}/potato/${inter.options.getSubcommand()}.js`).run

  cmd(inter)
}

const commands = fs
  .readdirSync(`${__dirname}/potato/`)
  .filter(file => file.endsWith('.js'))
  .map(file => require(`${__dirname}/potato/${file}`))

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
  })
}

module.exports = { meta: data, run: run }
