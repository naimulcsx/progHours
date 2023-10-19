import { LightOjCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("LightOJ crawler", () => {
  let crawler: LightOjCrawler;

  beforeEach(() => {
    crawler = new LightOjCrawler();
  });

  it("should parse lightoj problem - 1003", async () => {
    const result = await crawler.fetchProblem(
      "https://lightoj.com/problem/drunk"
    );
    const expectedResult: ProblemData = {
      pid: "LOJ-1003",
      name: "Drunk",
      tags: [],
      difficulty: 0,
      url: "https://lightoj.com/problem/drunk"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse lightoj problem - 1105 (with numeric problemId in URL)", async () => {
    const result = await crawler.fetchProblem(
      "https://lightoj.com/problem/1105"
    );
    const expectedResult: ProblemData = {
      pid: "LOJ-1105",
      name: "Fi Binary Number",
      difficulty: 0,
      tags: [],
      url: "https://lightoj.com/problem/fi-binary-number"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem", async () => {
    try {
      await crawler.fetchProblem("https://lightoj.com/problem/drunk-xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
