const sqlite3 = require('sqlite3');

var db = new sqlite3.Database(process.env.DB_PATH);

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS servers (serverID TEXT PRIMARY KEY, channelID TEXT DEFAULT '')");
});

const ERRORS = {
    GENERIC: 0,
    DUPLICATE: 1,
    NOT_FOUND: 2
}

Object.freeze(ERRORS);

module.exports = {
    db,
    ERRORS
}