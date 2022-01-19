const express = require("express");
const cors = require("cors");
const { makeQuery, getRows, getRowById } = require("./db/db");

const app = express();
const port = 8131;
app.use(cors());

const getDateTimeNow = () => {
  const now = new Date();
  const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  return `${date} ${time}`;
};

/* Authentication Logic */
// TODO: Integrate with auth system
const verifiedUser = (req, res) => {
  let token = req.authToken;
  token = "";
  // check if token is valid
  if (token !== undefined) {
    return true;
  }
  res.status(401).send("Error: User not authenticated");
  return false;
};

const getToken = (req, res, next) => {
  if (req.query.auth !== undefined) {
    // retrieve auth token from url
    req.authToken = req.query.auth;
  }
  next();
};

/* Validation Functions */
// check if a request Content-Type is specified to be application/json
const reqTypeIsAppJSON = (req, res) => {
  if (req.get("Content-Type") === "application/json") {
    return true;
  }
  res.status(400).send("Error: Content-Type is not application/json");
  return false;
};

// check if there are any undefined fields, returns true if any string is undefined
// accepts an array of objects as first param, and response object as second param
const undefinedParamExists = (fields, res) => {
  for (let i = 0; i < fields.length; i += 1) {
    if (fields[i] === undefined) {
      res.status(400).send("Error: One or more required fields are missing");
      return true;
    }
  }
  return false;
};

// check if parameters provided are of type string
const isTypeString = (fields, res) => {
  for (let i = 0; i < fields.length; i += 1) {
    if (typeof fields[i] !== "string") {
      res
        .status(400)
        .send("Error: One or more fields provided were of wrong data type");
      return false;
    }
  }
  return true;
};

// check if id is valid
const idIsValid = (id, res) => {
  if (typeof id === "number" && id > 0) {
    return true;
  }
  res.status(400).send("Error: IDs should be a JSON number data type");
  return false;
};

// check if rating value provided is valid
const ratingIsValid = (rating, res) => {
  if (typeof rating === "number" && rating >= 0 && rating <= 5) {
    return true;
  }
  res.status(400).send("Error: Rating provided is invalid");
  return false;
};

// check if comment provided is valid
const commentIsValid = (comment, res) => {
  if (typeof comment === "string" && comment.length > 0) {
    // check for special characters
    const specialChars = /[`#^&_\[\]{};'"|<>~]/; // eslint-disable-line no-useless-escape
    if (specialChars.test(comment)) {
      res
        .status(400)
        .send("Error: Comments should not contain special characters");
      return false;
    }
    return true;
  }
  res
    .status(400)
    .send("Error: Comments should be strings and have at least 1 character");
  return false;
};

// check if target type is valid
const targetIsValid = (target, res) => {
  if (
    typeof target === "string" &&
    (target === "student" ||
      target === "tutor" ||
      target === "module" ||
      target === "class")
  ) {
    return true;
  }
  res.status(400).send("Error: Target provided is invalid");
  return false;
};

const anonymousIsValid = (anonymous, res) => {
  if (typeof anonymous === "boolean" || anonymous === undefined) {
    return true;
  }
  res.status(400).send("Error: Anonymous parameter provided is invalid");
  return false;
};

/* Middleware */
app.use(express.json());
app.use(getToken);

/* Ratings API */
// 1.1 Get all ratings received
app.get("/api/v1/ratings/:target/:targetId", (req, res) => {
  // check if target is valid
  if (!["student", "tutor", "module", "class"].includes(req.params.target)) {
    res.status(400).send("Error: Target is invalid");
    return;
  }

  getRows(
    "SELECT * FROM ratings WHERE target = ? AND targetId = ?;",
    [req.params.target, req.params.targetId],
    (err, rows) => {
      if (err) {
        res.status(500).send("Error: Internal server error, please try again.");
      } else {
        const ratingList = [];
        rows.forEach((row) => {
          if (row.anonymous === 1) {
            // eslint-disable-next-line no-param-reassign
            row.studentId = "";
          }
          // eslint-disable-next-line
          row.anonymous = row.anonymous === 1 ? true : false;
          ratingList.push(row);
        });
        res.send(ratingList);
      }
    }
  );
});

// 1.2 Get all ratings sent out by a student (auth) TODO: auth
app.get("/api/v1/ratings/student/:studentId/sent", (req, res) => {
  if (!verifiedUser(req, res)) return;

  getRows(
    "SELECT * FROM ratings WHERE studentId = ?;",
    [req.params.studentId],
    (err, rows) => {
      if (err) {
        res.status(500).send("Error: Internal server error, please try again.");
      } else {
        const ratingList = [];
        rows.forEach((row) => {
          // eslint-disable-next-line
          row.anonymous = row.anonymous === 1 ? true : false;
          ratingList.push(row);
        });
        res.send(ratingList);
      }
    }
  );
});

// 1.3 Create a new rating (auth) TODO: VERIFY SENDER
app.post("/api/v1/ratings", (req, res) => {
  if (!verifiedUser(req, res) || !reqTypeIsAppJSON(req, res)) {
    return;
  }
  // validate body params
  const b = req.body;
  if (
    undefinedParamExists([b.rating, b.studentId, b.target, b.targetId], res) ||
    !isTypeString([b.studentId, b.target, b.targetId], res) ||
    !ratingIsValid(b.rating, res) ||
    !targetIsValid(b.target, res) ||
    !anonymousIsValid(b.anonymous, res)
  ) {
    return;
  }

  const query = `
    INSERT INTO ratings (rating, studentId, target, targetId, dateTime, anonymous)
    VALUES (${b.rating}, '${b.studentId}', '${b.target}', '${
    b.targetId
  }', '${getDateTimeNow()}', ${b.anonymous || false});
  `;

  try {
    makeQuery(query);
    res.send("Success: New rating created");
  } catch {
    res.status(500).send("Error: Internal server error, please try again.");
  }
});

// 1.4 Update existing rating (auth) TODO: Implement Auth
app.put("/api/v1/ratings", (req, res) => {
  if (!verifiedUser(req, res) || !reqTypeIsAppJSON(req, res)) {
    return;
  }
  // validate body params
  const b = req.body;
  if (
    undefinedParamExists([b.id, b.rating, b.studentId], res) ||
    !isTypeString([b.studentId], res) ||
    !idIsValid(b.id, res) ||
    !ratingIsValid(b.rating, res) ||
    !anonymousIsValid(b.anonymous, res)
  ) {
    return;
  }

  getRowById("ratings", b.id, (row) => {
    // check if id provided exists and matches studentId
    if (row === undefined || row.studentId !== b.studentId) {
      res.status(400).send("Error: Invalid ID provided");
    } else {
      // query to update row
      const query = `
        UPDATE ratings SET rating = ${b.rating} ${
        b.anonymous === undefined ? "" : `, anonymous = ${b.anonymous} `
      }WHERE id = ${b.id};
      `;

      try {
        makeQuery(query);
        res.send("Success: Rating has been updated");
      } catch {
        res.status(500).send("Error: Internal server error, please try again.");
      }
    }
  });
});

/*  Comments API */
// 2.1 Get all comments received TODO
app.get("/api/v1/comments/:target/:targetId", (req, res) => {
  // check if target is valid
  if (!["student", "tutor", "module", "class"].includes(req.params.target)) {
    res.status(400).send("Error: Target is invalid");
    return;
  }

  getRows(
    "SELECT * FROM comments WHERE target = ? AND targetId = ?;",
    [req.params.target, req.params.targetId],
    (err, rows) => {
      if (err) {
        res.status(500).send("Error: Internal server error, please try again.");
      } else {
        const ratingList = [];
        rows.forEach((row) => {
          if (row.anonymous === 1) {
            // eslint-disable-next-line no-param-reassign
            row.studentId = "";
          }
          // eslint-disable-next-line
          row.anonymous = row.anonymous === 1 ? true : false;
          ratingList.push(row);
        });
        res.send(ratingList);
      }
    }
  );
});

// 2.2 Get all comments sent out by a student (auth) TODO
app.get("/api/v1/comments/student/:studentId/sent", (req, res) => {
  if (!verifiedUser(req, res)) return;

  getRows(
    "SELECT * FROM comments WHERE studentId = ?;",
    [req.params.studentId],
    (err, rows) => {
      if (err) {
        res.status(500).send("Error: Internal server error, please try again.");
      } else {
        const ratingList = [];
        rows.forEach((row) => {
          // eslint-disable-next-line
          row.anonymous = row.anonymous === 1 ? true : false;
          ratingList.push(row);
        });
        res.send(ratingList);
      }
    }
  );
});

// 2.3 Create a new comment (auth)
app.post("/api/v1/comments", (req, res) => {
  if (!verifiedUser(req, res) || !reqTypeIsAppJSON(req, res)) {
    return;
  }
  // validate body params
  const b = req.body;
  if (
    undefinedParamExists([b.comment, b.studentId, b.target, b.targetId], res) ||
    !isTypeString([b.comment, b.studentId, b.target, b.targetId], res) ||
    !commentIsValid(b.comment, res) ||
    !targetIsValid(b.target, res) ||
    !anonymousIsValid(b.anonymous, res)
  ) {
    return;
  }

  const query = `
    INSERT INTO comments (comment, studentId, target, targetId, dateTime, anonymous)
    VALUES (?, ?, ?, ?, '${getDateTimeNow()}', ${b.anonymous || false});
  `;

  try {
    makeQuery(query, [b.comment, b.studentId, b.target, b.targetId]);
    res.send("Success: New comment created");
  } catch {
    res.status(500).send("Error: Internal server error, please try again.");
  }
});

// 2.4 Update existing comment (auth) TODO: Validate Auth
app.put("/api/v1/comments", (req, res) => {
  if (!verifiedUser(req, res) || !reqTypeIsAppJSON(req, res)) {
    return;
  }
  // validate body params
  const b = req.body;
  if (
    undefinedParamExists([b.id, b.comment, b.studentId], res) ||
    !isTypeString([b.comment, b.studentId], res) ||
    !idIsValid(b.id, res) ||
    !commentIsValid(b.comment, res) ||
    !anonymousIsValid(b.anonymous, res)
  ) {
    return;
  }

  getRowById("comments", b.id, (row) => {
    // check if id provided exists and matches studentId
    if (row === undefined || row.studentId !== b.studentId) {
      res.status(400).send("Error: Invalid ID provided");
    } else {
      // query to update row
      const query = `
        UPDATE comments SET comment = ? ${
          b.anonymous === undefined ? "" : `, anonymous = ${b.anonymous} `
        }WHERE id = ${b.id};
      `;

      try {
        makeQuery(query, b.comment);
        res.send("Success: Comment has been updated");
      } catch {
        res.status(500).send("Error: Internal server error, please try again.");
      }
    }
  });
});

// Catch invalid endpoint requests
app.use((req, res) => {
  res.status(404).send("Error: Invalid API method or endpoint");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
