const { MessageEmbed, TextChannel, Message, PartialMessage, ThreadChannel } = require("discord.js");
const { channelExcluded } = require('../checks');

/** Handles channel update event
 * 
 * @param {ThreadChannel} thread  
 * @param {Object} logChannels
 * @param {TextChannel=} logChannels.server
 * @param {TextChannel=} logChannels.users
 * @param {TextChannel=} logChannels.messages
 */
async function threadCreateHandler(thread, logChannels) {
    if (thread == null || logChannels.server == null) return;

    if (await channelExcluded(thread.parent)) return;

    const channel = thread.parent;

    const embed = new MessageEmbed()
        .setTitle("New Thread created")
        .setColor(parseInt("ff0000", 16))
        .setDescription(`A new thread has been created under <#${channel.id}>`)
        .addField(`User`, `<@${thread.ownerId}>`, true)
        .addField(`Archiving in`, `${thread.autoArchiveDuration} minutes`, true)
        .addField(`Parent Channel`, `<#${channel.id}>`, true)
        .addField(`Thread topic`, thread.name, true);

    await logChannels.messages
        .send({ content: `${thread.ownerId}`, embeds: [embed] })
        .catch((err) => { console.error(`Error sending message: ${err}`) });
}

module.exports = threadCreateHandler;