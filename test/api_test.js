const request = require("supertest");
const expect = require("expect");

const app = require("../app");

describe("Testing GET ratings/received endpoint", () => {
  it("responds with success status code", () =>
    // Make POST Request
    request(app)
      .get("/api/v1/ratings/received/student/INSERT_ID_HERE")
      .then((res) => {
        expect(res.status).toBe(200);
      }));
});
