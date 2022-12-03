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

describe("DELETE /api/articles/:article_id", () => {
  it("should return a 204 No Content if article deleted", () => {
    return request(app).delete("/api/articles/1").expect(204);
  });

  it("should reduce articles table size by one if deleted", () => {
    return db
      .query("SELECT COUNT (article_id) FROM articles;")
      .then(({ rows }) => {
        const originalTableSize = Number(rows[0].count);
        return request(app)
          .delete("/api/articles/1")
          .expect(204)
          .then(() => {
            return db
              .query("SELECT COUNT (article_id) FROM articles;")
              .then(({ rows }) => {
                expect(Number(rows[0].count)).toBe(originalTableSize - 1);
              });
          });
      });
  });

  it("Should return 404 error if no article exists to delete", () => {
    return request(app)
      .delete("/api/articles/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("not found");
      });
  });
});
