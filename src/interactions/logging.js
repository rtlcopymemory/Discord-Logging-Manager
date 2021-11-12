const { Interaction } = require("discord.js");

/**
 * 
 * @param {Interaction} interaction 
 */
async function handleLogging(interaction) {
    switch (interaction.options.getSubcommand()) {
        case "set":
            await interaction.reply("You used set");
            break;
        case "remove":
            await interaction.reply("You used remove");
            break;
    }
}

module.exports = handleLogging