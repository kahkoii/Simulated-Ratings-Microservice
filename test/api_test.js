const request = require("supertest");
const expect = require("expect");

const app = require("../app");

describe("Testing invalid API endpoint", () => {
  it("responds with 404 status code", () =>
    // Make POST Request
    request(app)
      .get("/api/v1/rating/apple")
      .then((res) => {
        expect(res.status).toBe(404);
      }));
});
