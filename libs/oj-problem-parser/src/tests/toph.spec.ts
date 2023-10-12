import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("Toph parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse toph problem - cash-change", async () => {
    const result = await parser.parse("https://toph.co/p/cash-change");
    const expectedResult: ParseResult = {
      pid: "Toph-cash-change",
      name: "Cash Change",
      difficulty: 0,
      tags: ["greedy", "implementation"],
      url: "https://toph.co/p/cash-change"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse("https://toph.co/p/cashing-changing");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
