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

describe("DELETE /api/comments/:comment_id", () => {
  it("should return 204 No Content if comment deleted", () => {
    return request(app).delete("/api/comments/1").expect(204);
  });

  it("should reduce comment table size by one if comment deleted", () => {
    return db
      .query("SELECT COUNT (comment_id) FROM comments;")
      .then(({ rows }) => {
        const originalTableSize = Number(rows[0].count);
        return request(app)
          .delete("/api/comments/1")
          .expect(204)
          .then(() => {
            return db
              .query("SELECT COUNT (comment_id) FROM comments;")
              .then(({ rows }) => {
                expect(Number(rows[0].count)).toBe(originalTableSize - 1);
              });
          });
      });
  });

  it("Should return 404 error if no comment exists to delete", () => {
    return request(app)
      .delete("/api/comment/999")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});
