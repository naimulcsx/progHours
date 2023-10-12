import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("Kattis parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse Kattis problem - sequences", async () => {
    const result = await parser.parse(
      "https://open.kattis.com/problems/sequences"
    );
    const expectedResult: ParseResult = {
      name: "0-1 Sequences",
      pid: "KT-sequences",
      difficulty: 0,
      url: "https://open.kattis.com/problems/sequences",
      tags: []
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse("https://open.kattis.com/problems/sequences-xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
