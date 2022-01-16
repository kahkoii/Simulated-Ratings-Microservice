const express = require("express");
const makeQuery = require("./db/db");

const app = express();
const port = 8131;

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

// check if rating value provided is valid
const ratingIsValid = (rating, res) => {
  if (typeof rating === "number" && rating >= 0 && rating <= 5) {
    return true;
  }
  res.status(400).send("Error: Rating provided is invalid");
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
// 1.1 Get all ratings received TODO
app.get("/api/v1/ratings/received/student/:recepientId", (req, res) => {
  res.send("Get all ratings received");
});

// 1.2 Get all ratings sent out (auth) TODO
app.get("/api/v1/ratings/sent/student/:senderId", (req, res) => {
  res.send("Get all ratings sent out");
});

// 1.3 Create a new rating (auth) TODO
app.post("/api/v1/ratings/student", (req, res) => {
  if (!verifiedUser(req, res) || !reqTypeIsAppJSON(req, res)) {
    return;
  }
  // validate body params
  const b = req.body;
  if (
    undefinedParamExists([b.rating, b.studentId, b.target, b.targetId], res) ||
    !isTypeString(b.studentId, b.target, b.targetId) ||
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

// 1.4 Update existing rating (auth) TODO
app.put("/api/v1/ratings/:ratingId", (req, res) => {
  res.send("Update existing rating");
});

/*  Comments API */
// 2.1 Get all comments received TODO
app.get("/api/v1/comments/received/student/:recepientId", (req, res) => {
  res.send("Get all comments received");
});

// 2.2 Get all comments sent out (auth) TODO
app.get("/api/v1/comments/sent/student/:senderId", (req, res) => {
  res.send("Get all comments sent out");
});

// 2.3 Create a new comment (auth) TODO
app.post("/api/v1/comments/student", (req, res) => {
  res.send("Create a new comment");
});

// 2.4 Update existing comment (auth) TODO
app.put("/api/v1/comments/:commentId", (req, res) => {
  res.send("Update existing comment");
});

// Catch invalid endpoint requests
app.use((req, res) => {
  res.status(404).send("Error: Invalid API method or endpoint");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
