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

    db.get("SELECT chServerID, chUserID, chMessageID FROM servers WHERE serverID = ?", [guild.id], async (err, row) => {
        if (!!err) {
            console.error(`Error in the SQL: ${err}`);
            return;
        }

        if (row == null || (row.chServerID === '' && row.chUserID === '' && row.chMessageID === '')) {
            // Row doesn't exist = there's no channels associated
            // All channels are empty strings = nothing set
            return;
        }

        let channels = await fetchChannels(guild, row);
        await callback(channels);
    })
}

/**
 * 
 * @param {Guild} guild 
 * @param {*} row 
 */
async function fetchChannels(guild, row) {
    let channels = {};

    if (row.chServerID !== '')
        channels.server = await guild.channels.fetch(row.chServerID);

    if (row.chUserID !== '')
        channels.users = await guild.channels.fetch(row.chUserID);

    if (row.chMessageID !== '')
        channels.messages = await guild.channels.fetch(row.chMessageID);

    return channels;
}

module.exports = {
    checkPerms,
    onGuildLogging
}