import { OJProblemParser } from "../core/OJProblemParser";

describe("OJProblemParser", () => {
  it("should have parse method", () => {
    const parser = new OJProblemParser();
    expect(parser.parse).toBeDefined();
  });
});
