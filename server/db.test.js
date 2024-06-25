const { getRecords, addRecord } = require("./db");

describe("GET endpoint /getRecords", () => {
  it("should get records from db in the cloud", async () => {
    const response = await getRecords();
    expect(response.message.length).toBeGreaterThan(0);
  });
});
