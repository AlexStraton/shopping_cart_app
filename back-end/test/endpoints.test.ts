import db from "../src/db/connection.js";
import app from "../app.js";
import seed from "../src/db/seeds/seed.js";
import request from "supertest";
import data from "../src/db/data/index.js";
import * as chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

const { expect } = chai;
// beforeEach(() => {
//   return seed(data);
// });
// afterAll(() => db.end());

describe("GET all courses", () => {
  it("should get all courses in a list", (done) => {
    chai
      .request(app)
      .get("/api/courses")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        done();
      });
  });
});
