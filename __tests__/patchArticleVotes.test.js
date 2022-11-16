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

describe("PATCH /api/articles/:article_id", () => {
  it("should return an object of corresponding article_id with vote property updated", () => {
    return request(app)
      .patch("/api/articles/3")
      .send({
        inc_votes: 32,
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.article).toMatchObject({
          article_id: 3,
          title: "Eight pug gifs that remind me of mitch",
          topic: "mitch",
          author: "icellusedkars",
          body: "some gifs",
          votes: 32,
        });
      });
  });

  it("should return a 400 error if incorrect 'inc_votes' property in body", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        monkey_tennis: 32,
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid inc_votes key or value");
      });
  });

  it("should return a 400 error if votes key is invalid", () => {
    return request(app)
      .patch("/api/articles/1")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid inc_votes key or value");
      });
  });

  it("should return a 404 error if passed an article_id which does not exist", () => {
    return request(app)
      .patch("/api/articles/999")
      .send({
        inc_votes: 32,
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  it("should return a 400 error if passed an invalid votes datatype", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({
        inc_votes: "dog",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid text representation");
      });
  });
});
