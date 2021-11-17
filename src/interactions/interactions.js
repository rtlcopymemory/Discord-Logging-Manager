const { Interaction } = require("discord.js");
const handleExclude = require("./exclude");
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
        case "exclude":
            await handleExclude(interaction);
            break;
    }
}

module.exports = {
    handleInteractions
}