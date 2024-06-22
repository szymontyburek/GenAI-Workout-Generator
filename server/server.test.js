const { getRecords } = require("./server");
const supertest = require("supertest");

describe("GET endpoint /getRecords", () => {
  it("should get records from db in the cloud", async () => {
    const response = await getRecords();
    expect(response.message.length).toBeGreaterThan(0);
  });
  it("Gets the test endpoint", async (done) => {
    // Sends GET Request to /getRecords endpoint
    const res = await request.get("/getRecords");
    expect(res.status).toBe(200);
    done();
  });
});
