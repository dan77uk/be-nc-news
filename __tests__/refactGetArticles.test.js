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

describe("GET /api/articles", () => {
  it("should return an array of articles sorted by author", () => {
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSorted({
          key: "author",
          descending: true,
        });
      });
  });

  it("should return an array of articles sorted by comment_count", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSorted({
          key: "comment_count",
          descending: true,
        });
      });
  });

  it("should return an array of articles in ascending order", () => {
    return request(app)
      .get("/api/articles?order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSorted({
          key: "created_at",
          descending: false,
        });
      });
  });

  it("should return a 400 error if passed a non-valid order query", () => {
    return request(app)
      .get("/api/articles?order=hair")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Invalid order query");
      });
  });

  it("should return an array of articles sorted by comment_count in non-default ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=comment_count&order=asc")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSorted({
          key: "comment_count",
          ascending: true,
        });
      });
  });

  it("should return an array of articles filtered by topic(cats)", () => {
    return request(app)
      .get("/api/articles?topic=cats")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(1);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            topic: "cats",
          });
        });
      });
  });

  it("should return an array of articles filtered by topic(mitch)", () => {
    return request(app)
      .get("/api/articles?topic=mitch")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(11);
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            topic: "mitch",
          });
        });
      });
  });

  it("should return a 204 error if passed topic query that does not exist", () => {
    return request(app).get("/api/articles?topic=dog").expect(204);
  });
});
