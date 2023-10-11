import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("LightOJ parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse lightoj problem - 1003", async () => {
    const result = await parser.parse("https://lightoj.com/problem/drunk");
    const expectedResult: ParseResult = {
      pid: "LOJ-1003",
      name: "Drunk",
      tags: [],
      difficulty: 0,
      url: "https://lightoj.com/problem/drunk"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse lightoj problem - 1105 (with numeric problemId in URL)", async () => {
    const result = await parser.parse("https://lightoj.com/problem/1105");
    const expectedResult: ParseResult = {
      pid: "LOJ-1105",
      name: "Fi Binary Number",
      difficulty: 0,
      tags: [],
      url: "https://lightoj.com/problem/fi-binary-number"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem", async () => {
    try {
      await parser.parse("https://lightoj.com/problem/drunk-xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
