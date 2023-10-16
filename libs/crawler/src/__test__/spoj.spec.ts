import { SpojCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("SPOJ crawler", () => {
  let crawler: SpojCrawler;

  beforeEach(() => {
    crawler = new SpojCrawler();
  });

  it("should parse spoj problem - BACTERIA", async () => {
    const result = await crawler.fetchProblem(
      "https://www.spoj.com/problems/BACTERIA"
    );
    const expectedResult: ProblemData = {
      pid: "SPOJ-BACTERIA",
      name: "SPOJ Custom Test",
      difficulty: 0,
      tags: [],
      url: "https://www.spoj.com/problems/BACTERIA"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await crawler.fetchProblem("https://www.spoj.com/problems/BACTERIAS");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
