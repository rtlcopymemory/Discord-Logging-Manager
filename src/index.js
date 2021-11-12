const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

require('dotenv').config();

const { handleInteractions } = require("./interactions/interactions");

if (!process.env.TOKEN) {
    console.error(' [ ERROR ] Token is Empty! Configure your environment')
    process.exit(-1);
}

const { registerGuildCommands } = require('./commands/commands');

client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    let guilds = await client.guilds.fetch();
    if (!guilds || guilds.size < 1) {
        console.error("No guilds!");
        process.exit(-1);
    }

    for (let i = 0; i < guilds.size; ++i) {
        registerGuildCommands(guilds.at(i).id);
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    await handleInteractions(interaction);
});

client.login(process.env.TOKEN);