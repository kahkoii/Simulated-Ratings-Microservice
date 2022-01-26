const request = require("supertest");
const expect = require("expect");

const app = require("../app");

describe("Testing POST ratings endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .post("/api/v1/ratings")
      .set("Content-Type", "application/json")
      .send({
        rating: 4,
        studentId: "test",
        target: "student",
        targetId: "test2",
        anonymous: true,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      }));
});

describe("Testing GET ratings endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .get("/api/v1/ratings/student/test2")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body[0].rating).toBe(4);
        expect(res.body[0].studentId).toBe("");
        expect(res.body[0].targetId).toBe("test2");
        expect(res.body[0].anonymous).toBe(true);
      }));
});

describe("Testing PUT ratings endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .put("/api/v1/ratings")
      .set("Content-Type", "application/json")
      .send({
        id: 1,
        rating: 5,
        studentId: "test",
      })
      .then((res) => {
        expect(res.status).toBe(200);
      }));
});

describe("Testing GET ratings SENT endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .get("/api/v1/ratings/student/test/sent")
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body[0].rating).toBe(5);
        expect(res.body[0].studentId).toBe("test");
        expect(res.body[0].targetId).toBe("test2");
        expect(res.body[0].anonymous).toBe(true);
      }));
});
