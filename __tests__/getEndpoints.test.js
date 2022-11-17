const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(data);
});
afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  it("should return a JSON object of all endpoints", () => {
    return request(app).get("/api").expect(200);
  });
  it("should return a 404 Not Found if given a broken path", () => {
    return request(app).get("/apeei").expect(404);
  });
});
