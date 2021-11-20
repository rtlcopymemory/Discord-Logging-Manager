const { MessageEmbed, TextChannel, VoiceState } = require("discord.js");

/** Handles channel update event
 * 
 * @param {VoiceState} oldState  
 * @param {VoiceState} newState  
 * @param {Object} logChannels
 * @param {TextChannel=} logChannels.server
 * @param {TextChannel=} logChannels.users
 * @param {TextChannel=} logChannels.messages
 */
async function voiceStateUpdateHandler(oldState, newState, logChannels) {
    if (newState == null || oldState == null || logChannels.users == null) return;

    const oldEmbed = new MessageEmbed()
        .setTitle("Voice State Update - BEFORE")
        .setColor(parseInt("ffff00", 16))
        .setDescription(`An user's voice state has been updated`)
        .addField(`Channel`, `<#${oldState.channelId}>`, true)
        .addField(`Deaf`, oldState.deaf, true)
        .addField(`Mute`, oldState.mute, true)
        .addField(`User`, `<@${oldState.member.id}>`, true);

    const newEmbed = new MessageEmbed()
        .setTitle("Voice State Update - AFTER")
        .setColor(parseInt("ffff00", 16))
        .setDescription(`An user's voice state has been updated`)
        .addField(`Channel`, `<#${newState.channelId}>`, true)
        .addField(`Deaf`, newState.deaf, true)
        .addField(`Mute`, newState.mute, true)
        .addField(`User`, `<@${newState.member.id}>`, true);

    await logChannels.messages
        .send({ content: `${newState.member.id}`, embeds: [oldEmbed, newEmbed] })
        .catch((err) => { console.error(`Error sending message: ${err}`) });
}

module.exports = voiceStateUpdateHandler;