const setupTables = (db) => {
  const query1 = `
      CREATE TABLE IF NOT EXISTS ratings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rating INTEGER NOT NULL CHECK (anonymous BETWEEN 0 AND 5),
        studentId TEXT NOT NULL,
        target TEXT NOT NULL,
        targetId TEXT NOT NULL,
        dateTime TEXT NOT NULL,
        anonymous INTEGER NOT NULL CHECK (anonymous IN (0, 1))
      );
    `;
  const query2 = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message TEXT NOT NULL,
      studentId TEXT NOT NULL,
      targetType TEXT NOT NULL,
      targetId TEXT NOT NULL,
      dateTime TEXT NOT NULL,
      anonymous INTEGER NOT NULL CHECK (anonymous IN (0, 1))
    );
  `;
  db.run(query1);
  db.run(query2);
};

module.exports = setupTables;
