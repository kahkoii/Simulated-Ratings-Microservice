const request = require("supertest");
const expect = require("expect");

const app = require("../app");

describe("Testing POST ratings/student endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .post("/api/v1/ratings/student")
      .set("Content-Type", "application/json")
      .send({
        rating: 5,
        studentId: "S10198765A",
        target: "module",
        targetId: "T024681012",
        anonymous: true,
      })
      .then((res) => {
        expect(res.status).toBe(200);
      }));
});
