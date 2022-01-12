const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "user",
  password: "password",
  database: "passenger_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Successfully connected to database.");
});

module.exports = connection;
