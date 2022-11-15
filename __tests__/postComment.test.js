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

describe.skip("POST /api/articles/:article_id/comments", () => {
  it("should return an object when passed a valid article_id and body", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({
        username: "Dan",
        body: "This is a comment from Supertest, not to be confused with SuperTed",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          username: expect.any(String),
          body: expect.any(String),
        });
      });
  });
});
