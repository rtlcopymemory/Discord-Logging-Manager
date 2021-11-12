const { Interaction, Channel } = require("discord.js");
const { db, ERRORS } = require("../db");

/**
 * 
 * @param {Interaction} interaction 
 */
async function handleLogging(interaction) {
    // Gotta check if moderator
    const serverID = interaction.guildId;

    switch (interaction.options.getSubcommand()) {
        case "set":
            /** @type {Channel} channel */
            let channel = interaction.options.getChannel('target');
            if (!channel) {
                await interaction.reply("Channel not valid");
                return;
            }

            db.get("SELECT * FROM servers WHERE serverID = ?", [serverID], async (err, row) => {
                if (!!err) {
                    await interaction.reply("An error has accured");
                    return;
                }

                if (!!row) {
                    await interaction.reply("Server already existing. Use remove");
                    return;
                }

                var stmt = db.prepare("INSERT INTO servers (serverID, channelID) VALUES (?, ?)");
                stmt.run(serverID, channel.id);
                stmt.finalize();

                await interaction.reply(`Channel <#${channel.id}> set`);
            })

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

                var stmt = db.prepare("DELETE FROM servers WHERE serverID = ?");
                stmt.run(serverID);
                stmt.finalize();

                await interaction.reply("Channel Removed Successfully");
            })

            break;
    }
}

module.exports = handleLogging