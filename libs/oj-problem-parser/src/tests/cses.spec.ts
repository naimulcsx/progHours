import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("OJProblemParser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse cses problem - 1068", async () => {
    const result = await parser.parse("https://cses.fi/problemset/task/1068");
    const expectedResult: ParseResult = {
      pid: "CSES-1068",
      name: "Weird Algorithm",
      difficulty: 0,
      tags: [],
      url: "https://cses.fi/problemset/task/1068"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse("https://cses.fi/problemset/task/1068xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
