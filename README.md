# Discord-Logging-Manager
Discord bot dedicated to logging user activities such as message edits, deletions, bulk deletions and more.

## Scopes
This bot needs both the `bot` and the `applications.commands` scopes when cerating an invite!

## Commands
- `logging <set_server/set_users/set_messages/remove> <channel>`: Sets or remove channels where the bot will post the logs
- `exclude`: Excludes the channel where the command is ran from logging.

## What it logs
Here's a list of what events are getting logged and to which channel category

### Server
- `channelDelete`
- `channelUpdate`
- `threadCreate`
- `webhookUpdate`

### User
- `guildMemberUpdate`
- `presenceUpdate`
- `voiceStateUpdate`

### Messages
- `messageDelete`
- `messageDeleteBulk`
- `messageReactionRemove`
- `messageUpdate`
