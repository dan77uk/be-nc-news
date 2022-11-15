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

describe("POST /api/articles/:article_id/comments", () => {
  it("should return an object when passed a valid article_id, body and valid username", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({
        username: "butter_bridge",
        body: "This is a comment from Supertest, not to be confused with SuperTed",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          article_id: 2,
          author: "butter_bridge",
          body: "This is a comment from Supertest, not to be confused with SuperTed",
          votes: 0,
          created_at: expect.any(String),
        });
      });
  });

  it("should return a 404 error when passed a valid article_id, body and INVALID username", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({
        username: "Dan",
        body: "This is a comment from Supertest, not to be confused with SuperTed",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User does not exist");
      });
  });

  it("should return a 404 error when passed a INVALID article_id, body and valid username", () => {
    return request(app)
      .post("/api/articles/999/comments")
      .send({
        username: "butter_bridge",
        body: "This is a comment from Supertest, not to be confused with SuperTed",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  it("should return a 400 error when when missing fields passed in body", () => {
    return request(app)
      .post("/api/articles/2/comments")
      .send({
        username: "butter_bridge",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing required fields");
      });
  });

  it("should return a 400 error when passed an invalid id datatype", () => {
    return request(app)
      .post("/api/articles/dog/comments")
      .send({
        username: "butter_bridge",
        body: "This is a comment from Supertest, not to be confused with SuperTed",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid text representation");
      });
  });
});
