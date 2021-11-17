const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const logging = require('./logging');
const exclude = require('./exclude');

/** iterates through all commands and registers them for the serverID passed
 * 
 * @param {String} guild_id 
 */
function registerGuildCommands(guild_id) {
    // ADD NEW COMMANDS HERE
    let commands = [
        logging,
        exclude
    ];

    sendRequest(commands, guild_id);
}

async function sendRequest(commands, guild_id) {
    try {
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, guild_id),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    registerGuildCommands
}