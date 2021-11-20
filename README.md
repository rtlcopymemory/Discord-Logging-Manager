# Discord-Logging-Manager
Discord bot dedicated to logging user activities such as message edits, deletions, bulk deletions and more.

## Running
Install `yarn` if you don't have it already.

```
yarn ci
```

Copy `.env.example` to `.env` and add your bot's **token** and **cliend id** there.

Run with

```
yarn start
```

## Scopes
This bot needs both the `bot` and the `applications.commands` scopes when cerating an invite!  
Suggested permissions: `139586817088`

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
