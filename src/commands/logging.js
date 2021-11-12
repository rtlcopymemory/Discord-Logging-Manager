const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = new SlashCommandBuilder()
    .setName('logging')
    .setDescription("Set or Unset the channel where posting the logging")
    .addSubcommand(subcommand =>
        subcommand
            .setName('set')
            .setDescription('Sets the channel dedicated to logging')
            .addChannelOption(option => option.setName('target').setDescription('The channel')))
    .addSubcommand(subcommand =>
        subcommand
            .setName('remove')
            .setDescription('Unsets the channel dedicated to logging')
            .addChannelOption(option => option.setName('target').setDescription('The channel')));
