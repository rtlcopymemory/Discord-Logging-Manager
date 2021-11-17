const sqlite3 = require('sqlite3');

var db = new sqlite3.Database(process.env.DB_PATH);

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS servers (serverID TEXT PRIMARY KEY, channelID TEXT DEFAULT '')");
    db.run("CREATE TABLE IF NOT EXISTS exclusions (serverID TEXT NOT NULL, channelID TEXT NOT NULL, PRIMARY KEY (serverID, channelID))");
});

module.exports = {
    db
}