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

            let error = -1;
            db.get("SELECT * FROM servers WHERE serverID = ?", [serverID], (err, row) => {
                if (!!err) {
                    error = ERRORS.GENERIC;
                    return;
                }

                if (!!row) {
                    error = ERRORS.DUPLICATE;
                }
            })

            if (error === ERRORS.GENERIC) {
                await interaction.reply("An error has accured");
                return;
            } else if (error === ERRORS.DUPLICATE) {
                await interaction.reply("Server already existing. Use remove");
                return;
            }

            var stmt = db.prepare("INSERT INTO servers (serverID, channelID) VALUES (?, ?)");
            stmt.run(serverID, channel.id);
            stmt.finalize();

            await interaction.reply(`Channel <#${channel.id}> set`);
            break;
        case "remove":
            await interaction.reply("You used remove");
            break;
    }
}

module.exports = handleLogging