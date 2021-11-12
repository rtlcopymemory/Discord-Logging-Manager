const { Interaction } = require("discord.js");
const handleLogging = require("./logging");

/**
 * 
 * @param {Interaction} interaction 
 */
async function handleInteractions(interaction) {
    switch (interaction.commandName) {
        case "logging":
            await handleLogging(interaction);
            break;
    }
}

module.exports = {
    handleInteractions
}