const { MessageEmbed, TextChannel, Message, PartialMessage } = require("discord.js");
const { channelExcluded } = require('../checks');

/** Handles channel update event
 * 
 * @param {Message<boolean> | PartialMessage} oldMessage  
 * @param {Message<boolean> | PartialMessage} newMessage  
 * @param {Object} logChannels
 * @param {TextChannel=} logChannels.server
 * @param {TextChannel=} logChannels.users
 * @param {TextChannel=} logChannels.messages
 */
async function messageUpdateHandler(oldMessage, newMessage, logChannels) {
    if (newMessage == null || oldMessage == null || logChannels.messages == null) return;

    if (await channelExcluded(newMessage.channel)) return;

    const channel = newMessage.channel;

    const oldEmbed = new MessageEmbed()
        .setTitle("Message Edit - BEFORE")
        .setColor(parseInt("ffff00", 16))
        .setDescription(oldMessage.content)
        .addField(`Author`, `<@${oldMessage.member.id}>`, true);

    const newEmbed = new MessageEmbed()
        .setTitle("Message Edit - AFTER")
        .setColor(parseInt("ffff00", 16))
        .setDescription(newMessage.content)
        .addField(`Author`, `<@${newMessage.member.id}>`, true);

    await logChannels.messages
        .send({ content: `${newMessage.member.id}`, embeds: [oldEmbed, newEmbed] })
        .catch((err) => { console.error(`Error sending message: ${err}`) });
}

module.exports = messageUpdateHandler;