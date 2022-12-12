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
  it("should return an array of articles", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(10);
      });
  });

  it("array should be sorted by created_at column in descending order", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toBeSorted({
          key: "created_at",
          descending: true,
        });
      });
  });

  it("should return an array of articles with all required properties", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        body.articles.forEach((article) => {
          expect(article).toMatchObject({
            title: expect.any(String),
            article_id: expect.any(Number),
            topic: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number),
            author: expect.any(String),
            comment_count: expect.any(Number),
          });
        });
      });
  });

  it("should return a 404 error for a broken path", () => {
    return request(app)
      .get("/api/articlez")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Not Found");
      });
  });

  it("should return a total_count property containing number of articles returned", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        expect(body.total_count).toBe(12);
      });
  });

  it("should return a total_count property with number of articles equal to num given in 'limit' query", () => {
    return request(app)
      .get("/api/articles?limit=7")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles.length).toBe(7);
      });
  });

  it("should return a total_count property of 2 when passed a p query value of 2", () => {
    return request(app)
      .get("/api/articles?p=2")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(2);
      });
  });

  it("should return a total_count property of 6 when passed a P query value of 2 with a LIMIT query value of 6", () => {
    return request(app)
      .get("/api/articles?limit=6&p=2")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(6);
      });
  });

  it("should ignore P query if passed anything other than a digit", () => {
    return request(app)
      .get("/api/articles?p=dog")
      .expect(200)
      .then(({ body }) => {
        expect(body.total_count).toBe(12);
      });
  });

  it("should return an empty array if P query is out of available offset range", () => {
    return request(app)
      .get("/api/articles?p=5")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(0);
      });
  });

  it("should return default LIMIT amount if passed anything other than digits on a LIMIT query", () => {
    return request(app)
      .get("/api/articles?limit=dog")
      .expect(200)
      .then(({ body }) => {
        expect(body.articles).toHaveLength(10);
      });
  });
});
