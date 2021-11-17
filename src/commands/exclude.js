const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = new SlashCommandBuilder()
    .setName('exclude')
    .setDescription("Toggle channel exclusion from logging");
