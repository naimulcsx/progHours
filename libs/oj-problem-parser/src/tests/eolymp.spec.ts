import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("Eolymp parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse Eolymp problem - 24", async () => {
    const result = await parser.parse("https://www.eolymp.com/en/problems/24");
    const expectedResult: ParseResult = {
      pid: "Eolymp-24",
      name: "Paint2D-Crack",
      difficulty: 0,
      url: "https://eolymp.com/en/problems/24",
      tags: []
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse("https://www.eolymp.com/en/problems/24xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
