import { HackerRankCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("HackerRank crawler", () => {
  let crawler: HackerRankCrawler;

  beforeEach(() => {
    crawler = new HackerRankCrawler();
  });

  it("should parse hackerrank problem - python-division", async () => {
    const result = await crawler.fetchProblem(
      "https://www.hackerrank.com/challenges/python-division/problem"
    );
    const expectedResult: ProblemData = {
      name: "Python: Division",
      pid: "HR-python-division",
      tags: [],
      difficulty: 0,
      url: "https://hackerrank.com/challenges/python-division/problem"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse hackerrank problem - sum-numbers-c", async () => {
    const result = await crawler.fetchProblem(
      "https://www.hackerrank.com/challenges/sum-numbers-c/problem?isFullScreen=true"
    );
    const expectedResult: ProblemData = {
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
      await crawler.fetchProblem(
        "https://www.hackerrank.com/challenges/python-division-xyz/problem?isFullScreen=true"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
