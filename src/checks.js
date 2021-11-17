const { GuildMember, Permissions } = require("discord.js");

/**
 * 
 * @param {GuildMember} user 
 */
function checkPerms(user) {
    return user.permissions.has([Permissions.FLAGS.BAN_MEMBERS]);
}

module.exports = {
    checkPerms
}