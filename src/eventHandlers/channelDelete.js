const { MessageEmbed, TextChannel, VoiceChannel, NewsChannel } = require("discord.js");

/** Handles channel delete event
 * 
 * @param {TextChannel|VoiceChannel|NewsChannel} channel 
 * @param {TextChannel} logChannel
 */
async function channelDeleteHandler(channel, logChannel) {
    if (!channel || !logChannel) return;

    if (!logChannel.isText()) return;

    const embed = new MessageEmbed()
        .setTitle("Channel Deleted")
        .setColor(parseInt("ff0000", 16))
        .setDescription(`A Channel has been deleted from this server`)
        .addField(`Channel Name`, channel.name, true)
        .addField(`Channel Topic`, `${!!channel.topic && channel.topic.length > 0 ? channel.topic : "[[EMPTY]]"}`, true)
        .addField(`Channel Type`, channel.type, true);

    await logChannel.send({ content: `${channel.id}`, embeds: [embed] });
}

module.exports = channelDeleteHandler;