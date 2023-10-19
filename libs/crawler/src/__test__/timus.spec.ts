import { TimusCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("Timus crawler", () => {
  let crawler: TimusCrawler;

  beforeEach(() => {
    crawler = new TimusCrawler();
  });

  it("should parse timus problem - 1000", async () => {
    const result = await crawler.fetchProblem(
      "https://acm.timus.ru/problem.aspx?space=1&num=1000"
    );
    const expectedResult: ProblemData = {
      pid: "Tim-1000",
      name: "A+B Problem",
      difficulty: 0,
      url: "https://acm.timus.ru/problem.aspx?space=1&num=1000",
      tags: []
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse timus problem - 1100 (with extra params)", async () => {
    const result = await crawler.fetchProblem(
      "https://acm.timus.ru/problem.aspx?space=1&num=1100&pqr=xyz"
    );
    const expectedResult: ProblemData = {
      pid: "Tim-1100",
      name: "Final Standings",
      difficulty: 0,
      url: "https://acm.timus.ru/problem.aspx?space=1&num=1100",
      tags: []
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await crawler.fetchProblem(
        "https://acm.timus.ru/problem.aspx?space=1&num=1000222"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
