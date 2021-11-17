const { Channel, MessageEmbed, TextChannel } = require("discord.js");

/** Handles channel delete event
 * 
 * @param {Channel} channel 
 * @param {TextChannel} logChannel
 */
async function channelDeleteHandler(channel, logChannel) {
    if (!channel || !logChannel) return;

    if (!logChannel.isText()) return;

    const embed = new MessageEmbed()
        .setTitle("Channel Deleted");

    await logChannel.send({ content: `${channel.id}`, embeds: [embed] });
}

module.exports = channelDeleteHandler;