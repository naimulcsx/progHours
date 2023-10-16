import { CodeToWinCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("CodeToWin crawler", () => {
  let crawler: CodeToWinCrawler;

  beforeEach(() => {
    crawler = new CodeToWinCrawler();
  });

  it("should parse CodeToWin problem - 1068", async () => {
    const result = await crawler.fetchProblem(
      "https://codeto.win/problem/1156"
    );
    const expectedResult: ProblemData = {
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
      await crawler.fetchProblem("https://codeto.win/problem/22");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
