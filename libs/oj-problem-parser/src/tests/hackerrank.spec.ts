import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("CSES parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse hackerrank problem - python-division", async () => {
    const result = await parser.parse(
      "https://www.hackerrank.com/challenges/python-division/problem"
    );
    const expectedResult: ParseResult = {
      name: "Python: Division",
      pid: "HR-python-division",
      tags: [],
      difficulty: 0,
      url: "https://hackerrank.com/challenges/python-division/problem"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse hackerrank problem - sum-numbers-c", async () => {
    const result = await parser.parse(
      "https://www.hackerrank.com/challenges/sum-numbers-c/problem?isFullScreen=true"
    );
    const expectedResult: ParseResult = {
      name: "Sum and Difference of Two Numbers",
      pid: "HR-sum-numbers-c",
      tags: [],
      difficulty: 0,
      url: "https://hackerrank.com/challenges/sum-numbers-c/problem"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse(
        "https://www.hackerrank.com/challenges/python-division-xyz/problem?isFullScreen=true"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
