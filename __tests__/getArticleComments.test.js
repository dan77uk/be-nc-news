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

describe("GET /api/articles/:article_id/comments", () => {
  it("should return an array of comments", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(10);
      });
  });

  it("should return an array of comments, each with correct fields", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        body.comments.forEach((comment) => {
          expect(comment).toMatchObject({
            article_id: 1,
            comment_id: expect.any(Number),
            author: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
          });
        });
      });
  });

  it("should be served with most recent comments first", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toBeSorted({
          key: "created_at",
          descending: true,
        });
      });
  });

  it("should return 404 status error if no article matches id", () => {
    return request(app)
      .get("/api/articles/993/comments")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Article not found");
      });
  });

  it("should return a 400 error if passed an invalid id", () => {
    return request(app)
      .get("/api/articles/dog/comments")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid article id");
      });
  });

  it("should return an empty array if valid article_id has no comments", () => {
    return request(app)
      .get("/api/articles/2/comments")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(0);
      });
  });

  it("should return an array of n comments when passed n as a LIMIT query", () => {
    return request(app)
      .get("/api/articles/1/comments?limit=3")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(3);
      });
  });

  it("should return an array of comments when passed a P(age) query", () => {
    return request(app)
      .get("/api/articles/1/comments?p=2")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(1);
      });
  });

  it("should return an array of length 5 when passed a P(age) query of 2 with a LIMIT query of 5", () => {
    return request(app)
      .get("/api/articles/1/comments?p=2&limit=5")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(5);
      });
  });

  it("should return an array of length 1 when passed a P(age) query of 3 with a LIMIT query of 5", () => {
    return request(app)
      .get("/api/articles/1/comments?p=3&limit=5")
      .expect(200)
      .then(({ body }) => {
        expect(body.comments).toHaveLength(1);
      });
  });
});
