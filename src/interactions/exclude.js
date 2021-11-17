const { Interaction } = require("discord.js");
const { checkPerms } = require("../checks");
const { db } = require("../db");

/**
 * 
 * @param {Interaction} interaction 
 */
async function handleExclude(interaction) {
    let user = interaction.member;
    if (!checkPerms(user)) {
        await interaction.reply("You don't have 'BAN' permissions to use this Command!");
        return;
    }

    const serverID = interaction.guildId;
    const channel = interaction.channel;

    db.get("SELECT * FROM exclusions WHERE serverID = ? AND channelID = ?", [serverID, channel.id], async (err, row) => {
        let adding = true;
        if (!!err) {
            console.error(`Error in SQL: ${err}`);
            await interaction.reply("An error has accured");
            return;
        }

        if (!row) {
            var stmt = db.prepare("INSERT INTO exclusions (serverID, channelID) VALUES (?, ?)");
            stmt.run(serverID, channel.id);
            stmt.finalize();
        } else {
            adding = false;
            var stmt = db.prepare("DELETE FROM exclusions WHERE serverID = ? AND channelID = ?");
            stmt.run(serverID, channel.id);
            stmt.finalize();
        }

        await interaction.reply({ content: `Channel ${adding ? "set for" : "removed from"} logging`, ephemeral: true });
    })
}

module.exports = handleExclude