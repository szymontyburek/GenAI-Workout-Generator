const request = require("supertest");
const app = require("./app");

describe("GET /getRecords", () => {
  it("should respond with a JSON object containing records", async () => {
    const response = await request(app).get("/getRecords");
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("records");
    expect(Array.isArray(response.body.records)).toBe(true);
    expect(response.body.records).toEqual(["record1", "record2", "record3"]);
  });
});
