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

describe("PATCH /api/comments/:comment_id", () => {
  it("should increment votes when passed a positive value", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({
        inc_votes: 1,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment.votes).toBe(17);
      });
  });

  it("should decrement votes when passed a negative value", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({
        inc_votes: -5,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment.votes).toBe(11);
      });
  });

  it("should return the updated comment object", () => {
    return request(app)
      .patch("/api/comments/1")
      .send({
        inc_votes: 1,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.comment).toMatchObject({
          article_id: 9,
          body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          author: "butter_bridge",
          created_at: expect.any(String),
          votes: 17,
        });
      });
  });

  it("should return a 404 error when passed a non existent ID", () => {
    return request(app)
      .patch("/api/comments/999")
      .send({
        inc_votes: 1,
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });

  it("should return a 404 error when broken path", () => {
    return request(app)
      .patch("/api/commentz/1")
      .send({
        inc_votes: 1,
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });

  it("should return a 400 error if passed an invalid votes datatype", () => {
    return request(app)
      .patch("/api/comments/2")
      .send({
        inc_votes: "dog",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid text representation");
      });
  });

  it("should return a 400 error if body parameter is in wrong format", () => {
    return request(app)
      .patch("/api/comments/2")
      .send({
        incvotes: 1,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
});
