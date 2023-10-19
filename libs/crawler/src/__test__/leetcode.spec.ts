import { LeetCodeCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("LeetCode crawler", () => {
  let crawler: LeetCodeCrawler;

  beforeEach(() => {
    crawler = new LeetCodeCrawler();
  });

  it("should parse LeetCode problem - 45", async () => {
    const result = await crawler.fetchProblem(
      "https://leetcode.com/problems/jump-game-ii/"
    );
    const expectedResult: ProblemData = {
      pid: "LC-45",
      name: "Jump Game II",
      difficulty: 0,
      url: "https://leetcode.com/problems/jump-game-ii",
      tags: ["array", "dynamic programming", "greedy"]
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse LeetCode problem - 1185", async () => {
    const result = await crawler.fetchProblem(
      "https://leetcode.com/problems/find-in-mountain-array/"
    );
    const expectedResult: ProblemData = {
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
      await crawler.fetchProblem("https://leetcode.com/problems/jump-game-xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
