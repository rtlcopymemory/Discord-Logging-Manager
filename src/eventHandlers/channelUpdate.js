const { MessageEmbed, TextChannel, VoiceChannel, NewsChannel } = require("discord.js");

/** Handles channel update event
 * 
 * @param {TextChannel|VoiceChannel|NewsChannel} oldChannel 
 * @param {TextChannel|VoiceChannel|NewsChannel} newChannel 
 * @param {TextChannel} logChannel
 */
async function channelUpdateHandler(oldChannel, newChannel, logChannel) {
    if (!oldChannel || !newChannel || !logChannel) return;

    if (!logChannel.isText()) return;

    const oldEmbed = new MessageEmbed()
        .setTitle("Channel Updated - BEFORE")
        .setColor(parseInt("ffff00", 16))
        .setDescription(`The updated channel before the changes`)
        .addField(`Channel Name`, oldChannel.name, true)
        .addField(`Channel Topic`, `${!!oldChannel.topic && oldChannel.topic.length > 0 ? oldChannel.topic : "[[EMPTY]]"}`, true);

    const newEmbed = new MessageEmbed()
        .setTitle("Channel Updated - AFTER")
        .setColor(parseInt("ffff00", 16))
        .setDescription(`The updated channel after the changes`)
        .addField(`Channel Name`, newChannel.name, true)
        .addField(`Channel Topic`, `${!!newChannel.topic && newChannel.topic.length > 0 ? newChannel.topic : "[[EMPTY]]"}`, true);

    await logChannel.send({ content: `${newChannel.id}`, embeds: [oldEmbed, newEmbed] });
}

module.exports = channelUpdateHandler;