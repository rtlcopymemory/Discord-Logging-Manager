const channelDeleteHandler = require('./channelDelete');
const channelUpdateHandler = require('./channelUpdate');
const deleteBulkHandler = require('./messageDeleteBulk');
const memberUpdateHandler = require('./guildMemberUpdate');
const messageDeleteHandler = require('./messageDelete');

module.exports = {
    channelDeleteHandler,
    channelUpdateHandler,
    deleteBulkHandler,
    memberUpdateHandler,
    messageDeleteHandler
}