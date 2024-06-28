const { getData, addRecord } = require("./db");

describe("GET endpoint /getData", () => {
  it("should get records from db in the cloud", async () => {
    const response = await getData();
    expect(response.message.length).toBeGreaterThan(0);
  });
});
