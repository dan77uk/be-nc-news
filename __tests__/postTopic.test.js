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

describe("POST /api/topics", () => {
  it("should return and object on key of topic", () => {
    return request(app)
      .post("/api/topics")
      .send({
        slug: "new topic name",
        description: "description text here",
      })
      .expect(201)
      .then(({ body }) => {
        expect(body.topic).toMatchObject({
          slug: "new topic name",
          description: "description text here",
        });
      });
  });

  it("should return a 400 error when when missing fields passed in body", () => {
    return request(app)
      .post("/api/topics")
      .send({
        slug: "new topic name",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing required fields");
      });
  });

  it("should return a 400 error when when missing fields passed in body", () => {
    return request(app)
      .post("/api/topics")
      .send({
        description: "description text here",
      })
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Missing required fields");
      });
  });

  it("should return a 404 error when passed broken URL", () => {
    return request(app)
      .post("/api/topicz")
      .send({
        slug: "new topic name",
        description: "description text here",
      })
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Not Found");
      });
  });
});
