const channelDeleteHandler = require('./channelDelete');
const channelUpdateHandler = require('./channelUpdate');
const deleteBulkHandler = require('./messageDeleteBulk');
const memberUpdateHandler = require('./guildMemberUpdate');
const messageDeleteHandler = require('./messageDelete');
const reactionRemoveHandler = require('./messageReactionRemove');
const messageUpdateHandler = require('./messageUpdate');
const presenceUpdateHandler = require('./presenceUpdate');
const threadCreateHandler = require('./threadCreate');
const webhookUpdateHandler = require('./webhookUpdate');
const voiceStateUpdateHandler = require('./voiceStateUpdate');

module.exports = {
    channelDeleteHandler,
    channelUpdateHandler,
    deleteBulkHandler,
    memberUpdateHandler,
    messageDeleteHandler,
    reactionRemoveHandler,
    messageUpdateHandler,
    presenceUpdateHandler,
    threadCreateHandler,
    webhookUpdateHandler,
    voiceStateUpdateHandler
}