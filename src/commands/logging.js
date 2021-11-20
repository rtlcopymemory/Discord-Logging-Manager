const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = new SlashCommandBuilder()
    .setName('logging')
    .setDescription("Set or Unset the channel where posting the logging")
    .addSubcommand(subcommand =>
        subcommand
            .setName('set_server')
            .setDescription('Sets the channel dedicated to logging SERVER events')
            .addChannelOption(option => option.setName('target').setDescription('The channel').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('set_users')
            .setDescription('Sets the channel dedicated to logging USERS events')
            .addChannelOption(option => option.setName('target').setDescription('The channel').setRequired(true)))
    .addSubcommand(subcommand =>
        subcommand
            .setName('set_messages')
            .setDescription('Sets the channel dedicated to logging MESSAGES events')
            .addChannelOption(option => option.setName('target').setDescription('The channel').setRequired(true)))

    .addSubcommand(subcommand =>
        subcommand
            .setName('remove')
            .setDescription('Unsets the channel dedicated to logging')
            .addChannelOption(option => option.setName('target').setDescription('The channel').setRequired(true)));
