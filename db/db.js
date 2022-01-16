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

// Query function to be exported, returns true on error.
const makeQuery = (query) => {
  db.run(query, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

module.exports = makeQuery;
