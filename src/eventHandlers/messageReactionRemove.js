const { MessageReaction, GuildMember, TextChannel, MessageEmbed } = require("discord.js");
const { channelExcluded } = require("../checks");

/**
 * 
 * @param {MessageReaction} messageReaction 
 * @param {GuildMember} user 
 * @param {Object} logChannels
 * @param {TextChannel} logChannels.server
 * @param {TextChannel} logChannels.users
 * @param {TextChannel} logChannels.messages
 */
async function reactionRemoveHandler(messageReaction, user, logChannels) {
    if (messageReaction == null || logChannels.messages == null) return;

    const channel = messageReaction.message.channel;
    if (await channelExcluded(channel)) return;

    const embed = new MessageEmbed()
        .setTitle("Reaction Removed")
        .setColor(parseInt("ff0000", 16))
        .setDescription(`Reaction removed from a message`)
        .addField(`Message`, messageReaction.message.url, true)
        .addField(`User`, `<@${user.id}>`, true)
        .addField(`Channel`, `<#${channel.id}>`, true)
        .setImage(messageReaction.emoji.url);

    await logChannels.messages
        .send({ content: `${user.id}`, embeds: [embed] })
        .catch((err) => { console.error(`Error sending message: ${err}`) });
}

module.exports = reactionRemoveHandler;