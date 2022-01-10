const express = require("express");

const app = express();
const port = 8131;

// TODO: Integrate with auth system
function getToken(req, res, next) {
  if (req.query.auth !== undefined) {
    // retrieve auth token from url
    req.authToken = req.query.auth;
  }
  next();
}

app.use(getToken);

/* Ratings */
// Get all ratings received
app.get("/api/v1/ratings/received/:recepientType/:recepientId", (req, res) => {
  res.send("Get all ratings received");
});

// Get all ratings sent out
app.get("/api/v1/ratings/sent/:senderType/:senderId", (req, res) => {
  res.send("Get all ratings sent out");
});

// Create a new rating
app.post("/api/v1/ratings/:userType", (req, res) => {
  res.send("Create a new rating");
});

// Update existing rating
app.put("/api/v1/ratings/:ratingId", (req, res) => {
  res.send("Update existing rating");
});

/*  Comments */
// Get all comments received
app.get("/api/v1/comments/received/:recepientType/:recepientId", (req, res) => {
  res.send("Get all comments received");
});

// Get all comments sent out
app.get("/api/v1/comments/sent/:senderType/:senderId", (req, res) => {
  res.send("Get all comments sent out");
});

// Create a new comment
app.post("/api/v1/comments/:userType", (req, res) => {
  res.send("Create a new comment");
});

// Update existing comment
app.put("/api/v1/comments/:commentId", (req, res) => {
  res.send("Update existing comment");
});

app.listen(port, () => console.log(`Listening on port ${port}...`));
