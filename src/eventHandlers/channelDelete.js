const { MessageEmbed, TextChannel, VoiceChannel, NewsChannel, Channel } = require("discord.js");

/** Handles channel delete event
 * 
 * @param {TextChannel|VoiceChannel|NewsChannel} channel 
 * @param {Object} logChannels 
 * @param {TextChannel} logChannels.server
 * @param {TextChannel} logChannels.users
 * @param {TextChannel} logChannels.messages
 */
async function channelDeleteHandler(channel, logChannels) {
    if (!channel || !logChannels.server) return;

    if (!logChannels.server.isText()) return;

    const embed = new MessageEmbed()
        .setTitle("Channel Deleted")
        .setColor(parseInt("ff0000", 16))
        .setDescription(`A Channel has been deleted from this server`)
        .addField(`Channel Name`, channel.name, true)
        .addField(`Channel Topic`, `${channel.topic != null && channel.topic.length > 0 ? channel.topic : "[[EMPTY]]"}`, true)
        .addField(`Channel Type`, channel.type, true);

    await logChannels.server.send({ content: `${channel.id}`, embeds: [embed] });
}

module.exports = channelDeleteHandler;