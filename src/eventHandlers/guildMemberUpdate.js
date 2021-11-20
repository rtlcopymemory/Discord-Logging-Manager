const { MessageEmbed, TextChannel, GuildMember } = require("discord.js");

/** Handles channel update event
 * 
 * @param {GuildMember} oldMember 
 * @param {GuildMember} newMember 
 * @param {Object} logChannels
 * @param {TextChannel} logChannels.server
 * @param {TextChannel} logChannels.users
 * @param {TextChannel} logChannels.messages
 */
async function memberUpdateHandler(oldMember, newMember, logChannels) {
    if (oldMember == null || newMember == null || logChannels.users == null) return;

    if (!logChannels.server.isText()) return;

    let oldPermissions = oldMember.permissions.toArray().reduce((acc, curr) => acc + ", " + curr);
    let newPermissions = newMember.permissions.toArray().reduce((acc, curr) => acc + ", " + curr);

    const oldEmbed = new MessageEmbed()
        .setTitle("Member Updated - BEFORE")
        .setColor(parseInt("ffff00", 16))
        .setDescription(`The updated member before the changes`)
        .addField(`Member displayName`, oldMember.displayName, true)
        .addField(`Member username`, oldMember.user.username)
        .addField(`Member Discriminator`, oldMember.user.discriminator, true)
        .addField(`Member Permissions`, oldPermissions, true)
        .setImage(oldMember.avatarURL());

    const newEmbed = new MessageEmbed()
        .setTitle("Member Updated - AFTER")
        .setColor(parseInt("ffff00", 16))
        .setDescription(`The updated member after the changes`)
        .addField(`Member displayName`, newMember.displayName, true)
        .addField(`Member username`, newMember.user.username)
        .addField(`Member Discriminator`, newMember.user.discriminator, true)
        .addField(`Member Permissions`, newPermissions, true)
        .setImage(newMember.avatarURL());

    await logChannels.users.send({ content: `${newMember.id}`, embeds: [oldEmbed, newEmbed] });
}

module.exports = memberUpdateHandler;
