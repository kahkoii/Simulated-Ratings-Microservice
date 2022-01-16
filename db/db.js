const sqlite = require("sqlite3");
const setupTables = require("./setup");

const db = new sqlite.Database("./db/student.db", (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.serialize(() => {
  setupTables(db);
  console.log("Database is set-up and operational");
});

module.exports = db;
