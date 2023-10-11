import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("UVa parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse UVa problem - 408", async () => {
    const result = await parser.parse(
      "https://onlinejudge.org/index.php?option=onlinejudge&Itemid=8&page=show_problem&problem=349"
    );
    const expectedResult: ParseResult = {
      pid: "UVA-408",
      name: "Uniform Generator",
      tags: [],
      difficulty: 0,
      url: "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=349"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse(
        "https://onlinejudge.org/index.php?option=onlinejudge&Itemid=8&page=show_problem&problem=34922"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
