import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("CodeChef parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse codechef problem - PREFONES (problemset link)", async () => {
    const result = await parser.parse(
      "https://www.codechef.com/problems/PREFONES"
    );
    const expectedResult: ParseResult = {
      pid: "CC-PREFONES",
      name: "Prefix Ones",
      difficulty: 1455,
      tags: ["greedy"],
      url: "https://www.codechef.com/problems/PREFONES"
    };
    expect(result).toEqual(expectedResult);
  });
});
