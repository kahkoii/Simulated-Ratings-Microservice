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
const makeQuery = (query, params = []) => {
  db.run(query, params, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

// Function to check if any row(s) with the given condition exist and return 1st row using callback
const getRowById = (table, id, callback) => {
  const query = `SELECT * FROM ${table} WHERE id = ?;`;
  db.all(query, id, (err, row) => {
    if (err) {
      console.error(err);
    }
    callback(row[0]);
  });
};

module.exports = { makeQuery, getRowById };
