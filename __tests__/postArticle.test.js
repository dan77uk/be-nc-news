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

describe("POST /api/articles/", () => {
  it("should return a newly created object when passed valid properties", () => {
    return request(app)
      .post("/api/articles")
      .send({
        username: "butter_bridge",
        body: "This is a new article...",
        title: "Now That's What I Call The Best Title Ever",
        topic: "cats",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.article).toMatchObject({
          article_id: expect.any(Number),
          author: "butter_bridge",
          body: "This is a new article...",
          title: "Now That's What I Call The Best Title Ever",
          topic: "cats",
          votes: 0,
          created_at: expect.any(String),
          comment_count: 0,
        });
      });
  });

  it("should return a 404 error when passed an INVALID username", () => {
    return request(app)
      .post("/api/articles")
      .send({
        username: "marg_overpass",
        body: "This is a new article...",
        title: "Now That's What I Call The Best Title Ever",
        topic: "cats",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("User does not exist");
      });
  });

  it("should return a 404 error when passed a INVALID topic", () => {
    return request(app)
      .post("/api/articles")
      .send({
        username: "butter_bridge",
        body: "This is a new article...",
        title: "Now That's What I Call The Best Title Ever",
        topic: "toast",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("No such topic");
      });
  });

  it("should return a 400 error when when missing fields passed in body", () => {
    return request(app)
      .post("/api/articles")
      .send({
        username: "butter_bridge",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing required fields");
      });
  });

  it("should return a 404 error when passed broken URL", () => {
    return request(app)
      .post("/api/articlesz")
      .send({
        username: "butter_bridge",
        body: "This is a new article...",
        title: "Now That's What I Call The Best Title Ever",
        topic: "cats",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});
