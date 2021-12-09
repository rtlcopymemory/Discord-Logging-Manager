const { MessageEmbed, TextChannel, Message, PartialMessage } = require("discord.js");
const { channelExcluded } = require('../checks');

/** Handles channel update event
 * 
 * @param {Message<boolean> | PartialMessage} message  
 * @param {Object} logChannels
 * @param {TextChannel=} logChannels.server
 * @param {TextChannel=} logChannels.users
 * @param {TextChannel=} logChannels.messages
 */
async function messageDeleteHandler(message, logChannels) {
    if (message == null || logChannels.messages == null) return;

    if (await channelExcluded(message.channel)) return;

    const channel = message.channel;

    const embed = new MessageEmbed()
        .setTitle("Message Delete")
        .setColor(parseInt("ff0000", 16))
        .setDescription(message.content)
        .addField(`Message Author`, `${message.member != null ? message.member.user.username : "User not in server"}#${message.member != null ? message.member.user.discriminator : "User not in server"}`, true)
        .addField(`Channel`, `<#${channel.id}>`, true);

    await logChannels.messages
        .send({ content: `${message.member != null ? message.member.id : "Cant get id of banned member"}`, embeds: [embed] })
        .catch((err) => { console.error(`Error sending message: ${err}`) });
}

module.exports = messageDeleteHandler;
