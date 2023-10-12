import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("LeetCode parser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should parse LeetCode problem - 45", async () => {
    const result = await parser.parse(
      "https://leetcode.com/problems/jump-game-ii/"
    );
    const expectedResult: ParseResult = {
      pid: "LC-45",
      name: "Jump Game II",
      difficulty: 0,
      url: "https://leetcode.com/problems/jump-game-ii",
      tags: ["array", "dynamic programming", "greedy"]
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse LeetCode problem - 1185", async () => {
    const result = await parser.parse(
      "https://leetcode.com/problems/find-in-mountain-array/"
    );
    const expectedResult: ParseResult = {
      pid: "LC-1185",
      name: "Find in Mountain Array",
      difficulty: 0,
      url: "https://leetcode.com/problems/find-in-mountain-array",
      tags: ["array", "binary search", "interactive"]
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await parser.parse("https://leetcode.com/problems/jump-game-xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
