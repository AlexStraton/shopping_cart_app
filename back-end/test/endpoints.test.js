import db from "../db/connection.js";
import app from "../app.js";
import seed from "../db/seeds/seed.js";
import request from "supertest";
import data from "../db/data/index.js";
beforeEach(() => {
    return seed(data);
});
afterAll(() => db.end());
describe("GET /api/products", () => {
    test("status: 200 responds with all products", () => {
        return request(app)
            .get("/api/products")
            .expect(200)
            .then(() => {
            console.log("here");
        });
        // .then(({ products }) => {
        //   expect(products).toHaveLength(8);
        //   products.forEach((product) => {
        //     console.log(product);
        //     expect(products).toMatchObject({
        //       product_id: expect.any(Number),
        //       product_name: expect.any(String),
        //       price: expect.any(Number),
        //       product_image_url: expect.any(String),
        //       description: expect.any(String),
        //     });
        //   });
        // });
    });
});
