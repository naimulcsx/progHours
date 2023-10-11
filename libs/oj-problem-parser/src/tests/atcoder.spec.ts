import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("AtCoder parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse atcoder problem - abc322_e", async () => {
    const result = await parser.parse(
      "https://atcoder.jp/contests/abc322/tasks/abc322_e"
    );
    const expectedResult: ParseResult = {
      name: "Product Development",
      pid: "AC-abc322_e",
      tags: [],
      difficulty: 0,
      url: "https://atcoder.jp/contests/abc322/tasks/abc322_e"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse atcoder problem - abc322_e (with www)", async () => {
    const result = await parser.parse(
      "https://www.atcoder.jp/contests/abc322/tasks/abc322_e"
    );
    const expectedResult: ParseResult = {
      name: "Product Development",
      pid: "AC-abc322_e",
      tags: [],
      difficulty: 0,
      url: "https://atcoder.jp/contests/abc322/tasks/abc322_e"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse("https://atcoder.jp/contests/abc322/tasks/abc322_k");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
