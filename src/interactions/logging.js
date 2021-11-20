const { Interaction, TextChannel } = require("discord.js");
const { checkPerms } = require("../checks");
const { db } = require("../db");

/**
 * 
 * @param {Interaction} interaction 
 */
async function handleLogging(interaction) {
    let user = interaction.member;
    if (!checkPerms(user)) {
        await interaction.reply("You don't have 'BAN' permissions to use this Command!");
        return;
    }

    // Gotta check if moderator
    const serverID = interaction.guildId;

    /** @type {TextChannel} channel */
    let channel = interaction.options.getChannel('target');

    if (channel == null || !channel.isText()) {
        await interaction.reply("Please specify a text channel!");
        return;
    }

    switch (interaction.options.getSubcommand()) {
        case "set_server":
            if (!channel) {
                await interaction.reply("Channel not valid");
                return;
            }

            db.get("SELECT * FROM servers WHERE serverID = ? AND chServerID = ?", [serverID, channel.id], async (err, row) => {
                if (!!err) {
                    await interaction.reply("An error has accured");
                    return;
                }

                if (!!row) {
                    await interaction.reply("Channel already in use as server log. Use remove");
                    return;
                }

                insertServer(serverID);

                stmt = db.prepare("UPDATE servers SET chServerID = ? WHERE serverID = ?");
                stmt.run(channel.id, serverID);
                stmt.finalize();

                await interaction.reply(`Channel <#${channel.id}> set`);
            });

            break;

        case "set_users":
            if (!channel) {
                await interaction.reply("Channel not valid");
                return;
            }

            db.get("SELECT * FROM servers WHERE serverID = ? AND chUserID = ?", [serverID, channel.id], async (err, row) => {
                if (!!err) {
                    await interaction.reply("An error has accured");
                    return;
                }

                if (!!row) {
                    await interaction.reply("Channel already in use as user log. Use remove");
                    return;
                }

                insertServer(serverID);

                stmt = db.prepare("UPDATE servers SET chUserID = ? WHERE serverID = ?");
                stmt.run(channel.id, serverID);
                stmt.finalize();

                await interaction.reply(`Channel <#${channel.id}> set`);
            });

            break;

        case "set_messages":
            if (!channel) {
                await interaction.reply("Channel not valid");
                return;
            }

            db.get("SELECT * FROM servers WHERE serverID = ? AND chMessageID = ?", [serverID, channel.id], async (err, row) => {
                if (!!err) {
                    await interaction.reply("An error has accured");
                    return;
                }

                if (!!row) {
                    await interaction.reply("Channel already in use as message log. Use remove");
                    return;
                }

                insertServer(serverID);

                stmt = db.prepare("UPDATE servers SET chMessageID = ? WHERE serverID = ?");
                stmt.run(channel.id, serverID);
                stmt.finalize();

                await interaction.reply(`Channel <#${channel.id}> set`);
            });

            break;

        case "remove":
            db.get("SELECT * FROM servers WHERE serverID = ?", [serverID], async (err, row) => {
                if (!!err) {
                    await interaction.reply("An error has accured");
                    return;
                }

                if (!row) {
                    await interaction.reply("Trying to remove a server not in the Database");
                    return;
                }

                if (row.chServerID != null && row.chServerID === channel.id) {
                    var stmt = db.prepare("UPDATE servers SET chServerID = '' WHERE serverID = ?");
                    stmt.run(serverID);
                    stmt.finalize();
                }

                if (row.chUserID != null && row.chUserID === channel.id) {
                    var stmt = db.prepare("UPDATE servers SET chUserID = '' WHERE serverID = ?");
                    stmt.run(serverID);
                    stmt.finalize();
                }

                if (row.chMessageID != null && row.chMessageID === channel.id) {
                    var stmt = db.prepare("UPDATE servers SET chMessageID = '' WHERE serverID = ?");
                    stmt.run(serverID);
                    stmt.finalize();
                }

                await interaction.reply("Channel Removed Successfully");
            });

            break;
    }
}

function insertServer(serverID) {
    // If the row doesn't exist, create it
    var stmt = db.prepare("INSERT OR IGNORE INTO servers (serverID) VALUES (?)");
    stmt.run(serverID);
    stmt.finalize();
}

module.exports = handleLogging;
