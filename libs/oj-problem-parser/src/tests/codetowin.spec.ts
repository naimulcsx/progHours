import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("CodeToWin parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse CodeToWin problem - 1068", async () => {
    const result = await parser.parse("https://codeto.win/problem/1156");
    const expectedResult: ParseResult = {
      name: "Between Enemy Lines",
      pid: "CW-1156",
      difficulty: 0,
      url: "https://codeto.win/problem/1156",
      tags: []
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse("https://codeto.win/problem/22");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
