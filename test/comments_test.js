const request = require("supertest");
const expect = require("expect");

const app = require("../app");

describe("Testing POST comments endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .post("/api/v1/comments")
      .set("Content-Type", "application/json")
      .send({
        comment: "lol hi",
        studentId: "test",
        target: "student",
        targetId: "test2",
        anonymous: true,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      }));
});

describe("Testing GET comments endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .get("/api/v1/comments/student/test2")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body[0].comment).toBe("lol hi");
        expect(res.body[0].studentId).toBe("");
        expect(res.body[0].targetId).toBe("test2");
        expect(res.body[0].anonymous).toBe(true);
      }));
});

describe("Testing PUT comments endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .put("/api/v1/comments")
      .set("Content-Type", "application/json")
      .send({
        id: 1,
        comment: "ok bye",
        studentId: "test",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      }));
});

describe("Testing GET comments SENT endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .get("/api/v1/comments/student/test/sent")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body[0].comment).toBe("ok bye");
        expect(res.body[0].studentId).toBe("test");
        expect(res.body[0].targetId).toBe("test2");
        expect(res.body[0].anonymous).toBe(true);
      }));
});
