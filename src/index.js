const { Client, Intents } = require('discord.js');
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_WEBHOOKS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MESSAGE_TYPING
    ]
});

require('dotenv').config();

if (!process.env.TOKEN) {
    console.error(' [ ERROR ] Token is Empty! Configure your environment')
    process.exit(-1);
}

const { handleInteractions } = require("./interactions/interactions");
const { registerGuildCommands } = require('./commands/commands');
const { onGuildLogging } = require('./checks');
const handlers = require('./eventHandlers/handlers');

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

client.on('channelDelete', async channel => {
    onGuildLogging(channel.guild, async (logChannel) => { await handlers.channelDeleteHandler(channel, logChannel); });
});

client.on('channelUpdate', async (oldChannel, newChannel) => {
    onGuildLogging(newChannel.guild, async (logChannel) => { await handlers.channelUpdateHandler(oldChannel, newChannel, logChannel); });
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    onGuildLogging(newMember.guild, async (logChannel) => { });
});

client.on('messageDelete', async message => {
    onGuildLogging(message.guild, async (logChannel) => { });
});

client.on('messageDeleteBulk', async messages => {
    onGuildLogging(messages.last().guild, async (logChannel) => { handlers.deleteBulkHandler(messages, logChannel) });
});

client.on('messageReactionAdd', async (messageReaction, user) => {
    onGuildLogging(messageReaction.message.guild, async (logChannel) => { });
});

client.on('messageReactionRemove', async (messageReaction, user) => {
    onGuildLogging(messageReaction.message.guild, async (logChannel) => { });
});

client.on('messageReactionRemoveAll', async (message, reactions) => {
    onGuildLogging(message.guild, async (logChannel) => { });
});

client.on('messageUpdate', async (oldMessage, newMessage) => {
    onGuildLogging(newMessage.guild, async (logChannel) => { });
});

client.on('presenceUpdate', async (oldPresence, newPresence) => {
    onGuildLogging(newPresence.guild, async (logChannel) => { });
});

client.on('threadCreate', async thread => {
    onGuildLogging(thread.guild, async (logChannel) => { });
});

client.on('threadMembersUpdate', async (oldMembers, newMembers) => {
    onGuildLogging(newMembers.last().guildMember.guild, async (logChannel) => { });
});

client.on('threadMemberUpdate', async (oldMember, newMember) => {
    onGuildLogging(newMember.guildMember.guild, async (logChannel) => { });
});

client.on('webhookUpdate', async channel => {
    onGuildLogging(channel.guild, async (logChannel) => { });
});

client.on('error', async error => {
    console.error(` [ERROR] An error has occured:\n${error}`);
});

client.on('guildCreate', async guild => {
    // A.
    registerGuildCommands(guild.id);
});

client.login(process.env.TOKEN);