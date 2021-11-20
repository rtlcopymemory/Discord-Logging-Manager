const fs = require('fs');
const { default: Collection } = require("@discordjs/collection");
const { MessageEmbed, TextChannel, Message, PartialMessage, MessageAttachment } = require("discord.js");
const { tmpDir } = require("../consts");
const { channelExcluded } = require('../checks');

/** Handles channel update event
 * 
 * @param {Collection<string, Message<boolean> | PartialMessage>} messages 
 * @param {TextChannel} logChannels
 * @param {TextChannel} logChannels.server
 * @param {TextChannel} logChannels.users
 * @param {TextChannel} logChannels.messages
 */
async function deleteBulkHandler(messages, logChannels) {
    if (messages == null || logChannels.messages == null) return;

    if (await channelExcluded(messages.last().channel)) return;

    const channel = messages.last().channel;

    /** @type {Array} messagesArray */
    let messagesArray = [...messages.values()];

    if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });

    const rng_num = Math.floor(
        Math.random() * 999
    );
    const filePath = `${tmpDir}/${channel.id}_${rng_num}.txt`;

    let logger = fs.createWriteStream(filePath, {
        flags: 'w' // 'w' writes and creates if not exists
    })

    logger.on("open", async () => {
        logger.write(`Bulk deletion log for channel: ${channel.id} #${channel.name} at: ${new Date()}\n\n`);

        for (let i = messagesArray.length - 1; i >= 0; --i) {
            /** @type {Message<boolean> | PartialMessage} message */
            let message = messagesArray[i];
            if (!message) continue;

            let line = `[${new Date(message.createdTimestamp)}] Attachments: (${message.attachments.size})` +
                ` ${message.author.id} ${message.author.username} : ${message.content}\n`;

            logger.write(line);
        }

        logger.end();
        logger.close();

        const attachment = new MessageAttachment(filePath);

        const embed = new MessageEmbed()
            .setTitle("Bulk Delete")
            .setColor(parseInt("ff0000", 16))
            .setDescription(`Bulk Deletion in <#${channel.id}>`)

        await logChannels.messages
            .send({ content: `${channel.id}`, embeds: [embed], files: [attachment] })
            .catch((err) => { console.error(`Error sending message: ${err}`) })
            .finally(() => {
                fs.rmSync(filePath);
            });
    })
}

module.exports = deleteBulkHandler;