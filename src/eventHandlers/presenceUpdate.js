const { MessageEmbed, TextChannel, Presence } = require("discord.js");

/** Handles channel update event
 * 
 * @param {Presence} oldPresence  
 * @param {Presence} newPresence  
 * @param {Object} logChannels
 * @param {TextChannel=} logChannels.server
 * @param {TextChannel=} logChannels.users
 * @param {TextChannel=} logChannels.messages
 */
async function presenceUpdateHandler(oldPresence, newPresence, logChannels) {
    if (newPresence == null || oldPresence == null || logChannels.users == null) return;

    let oldActivities = oldPresence.activities.reduce((acc, curr) => acc + (acc !== "" ? ", " : "") + curr.state, "");
    let newActivities = newPresence.activities.reduce((acc, curr) => acc + (acc !== "" ? ", " : "") + curr.state, "");

    if (oldActivities === '')
        oldActivities = "[[EMPTY]]";

    if (newActivities === '')
        newActivities = "[[EMPTY]]";

    const oldEmbed = new MessageEmbed()
        .setTitle("Presence Update - BEFORE")
        .setColor(parseInt("00ff00", 16))
        .setDescription(`An user update their Presence`)
        .addField(`Status`, oldPresence.status, true)
        .addField(`Activities`, oldActivities, true)
        .addField(`User`, `<@${oldPresence.member.id}>`, true);

    const newEmbed = new MessageEmbed()
        .setTitle("Presence Update - AFTER")
        .setColor(parseInt("00ff00", 16))
        .setDescription(`An user update their Presence`)
        .addField(`Status`, newPresence.status, true)
        .addField(`Activities`, newActivities, true)
        .addField(`User`, `<@${newPresence.member.id}>`, true);

    await logChannels.messages
        .send({ content: `${newPresence.member.id}`, embeds: [oldEmbed, newEmbed] })
        .catch((err) => { console.error(`Error sending message: ${err}`) });
}

module.exports = presenceUpdateHandler;