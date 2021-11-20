const { MessageEmbed, TextChannel, NewsChannel } = require("discord.js");

/** Handles channel update event
 * 
 * @param {TextChannel | NewsChannel} channel  
 * @param {Object} logChannels
 * @param {TextChannel=} logChannels.server
 * @param {TextChannel=} logChannels.users
 * @param {TextChannel=} logChannels.messages
 */
async function webhookUpdateHandler(channel, logChannels) {
    if (channel == null || logChannels.server == null) return;

    let webhooks = (await channel.fetchWebhooks()).reduce((acc, value) => acc + (acc.length < 1 ? "" : ", ") + value.name, "");

    const embed = new MessageEmbed()
        .setTitle("Webhook update!")
        .setColor(parseInt("ff0000", 16))
        .setDescription(`A webhook has been updated`)
        .addField(`Channel`, `<#${channel.id}>`, true)
        .addField(`Webhooks`, webhooks, true);

    await logChannels.messages
        .send({ content: `${channel.id}`, embeds: [embed] })
        .catch((err) => { console.error(`Error sending message: ${err}`) });
}

module.exports = webhookUpdateHandler;