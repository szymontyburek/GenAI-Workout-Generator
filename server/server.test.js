const request = require("supertest");
const { getRecords } = require("./server");

describe("GET endpoint /getRecords", () => {
  it("should get records from db in the cloud", async () => {
    const response = await getRecords();
    expect(response.message.length).toBeGreaterThan(0);
  });
});
