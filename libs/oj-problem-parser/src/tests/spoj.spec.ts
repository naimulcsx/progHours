import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("OJProblemParser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse spoj problem - BACTERIA", async () => {
    const result = await parser.parse("https://www.spoj.com/problems/BACTERIA");
    const expectedResult: ParseResult = {
      pid: "SPOJ-BACTERIA",
      name: "SPOJ Custom Test",
      difficulty: 0,
      tags: [],
      url: "https://www.spoj.com/problems/BACTERIA"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse("https://www.spoj.com/problems/BACTERIAS");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
