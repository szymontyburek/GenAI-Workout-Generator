const { getRecords, addRecord } = require("./db");

describe("GET endpoint /getRecords", () => {
  it("should get records from db in the cloud", async () => {
    const response = await getRecords();
    expect(response.message.length).toBeGreaterThan(0);
  });
});

describe("POST endpoint /addRecord", () => {
  it("successful addition of record to database", async () => {
    expect(await addRecord({ description: "", base64: "" })).toBeTruthy();
  });
});
