const { GuildMember, Permissions, Guild } = require("discord.js");
const { db } = require("./db");

/**
 * 
 * @param {GuildMember} user 
 */
function checkPerms(user) {
    return user.permissions.has([Permissions.FLAGS.BAN_MEMBERS]);
}

/** Checks if the guild is currently logging.  
 * If it's not, it does nothing.  
 * If yes, it runs the callback.
 * 
 * The callback signature must be: `(Channel) => void`  
 * Channel is the **Logging Channel**
 * 
 * @param {Guild} guild 
 * @param {CallableFunction} callback
 */
async function onGuildLogging(guild, callback) {
    if (!guild || !callback) return;

    db.get("SELECT channelID FROM servers WHERE serverID = ? AND channelID <> '' AND channelID IS NOT Null", [guild.id], async (err, row) => {
        if (!!err) {
            console.error(`Error in the SQL: ${err}`);
            return;
        }

        if (!row) {
            // Row doesn't exist = there's no channel associated
            return;
        }

        channel = guild.channels.cache.get(row.channelID) || await guild.channels.fetch(row.channelID);
        await callback(channel);
    })
}

module.exports = {
    checkPerms,
    onGuildLogging
}