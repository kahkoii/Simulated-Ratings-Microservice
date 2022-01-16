const express = require("express");
const db = require("./db/db");

const app = express();
const port = 8131;

/* Authentication Logic */
// TODO: Integrate with auth system
const verifiedUser = (req, res) => {
  let token = req.authToken;
  token = "";
  // check if token is valid
  if (token !== undefined) {
    return true;
  }
  res.status(401).send("Error: user not authenticated");
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
const reqTypeIsAppJSON = (req, res) => {
  if (req.get("Content-Type") === "application/json") {
    return true;
  }
  res.status(400).send("Error: Content-Type is not application/json");
  return false;
};

// TODO: REMOVE AFTER TESTING
app.get("/test", (req, res) => {
  db.get("SELECT * FROM ratings", (err, row) => {
    if (err) throw err;
    res.send(row);
  });
});

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
  console.log(req.body);
  res.send("Create a new rating");
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

app.listen(port, () => console.log(`Listening on port ${port}...`));

module.exports = app;
