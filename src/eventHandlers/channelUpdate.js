const { MessageEmbed, TextChannel, VoiceChannel, NewsChannel } = require("discord.js");
const { channelExcluded } = require("../checks");

/** Handles channel update event
 * 
 * @param {TextChannel|VoiceChannel|NewsChannel} oldChannel 
 * @param {TextChannel|VoiceChannel|NewsChannel} newChannel 
 * @param {TextChannel} logChannels
 * @param {TextChannel} logChannels.server
 * @param {TextChannel} logChannels.users
 * @param {TextChannel} logChannels.messages
 */
async function channelUpdateHandler(oldChannel, newChannel, logChannels) {
    if (!oldChannel || !newChannel || !logChannels.server) return;

    if (await channelExcluded(newChannel)) return;

    if (!logChannels.server.isText()) return;

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

    await logChannels.server.send({ content: `${newChannel.id}`, embeds: [oldEmbed, newEmbed] });
}

module.exports = channelUpdateHandler;