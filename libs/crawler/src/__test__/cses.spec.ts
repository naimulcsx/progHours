import { CsesCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("CSES crawler", () => {
  let crawler: CsesCrawler;

  beforeEach(() => {
    crawler = new CsesCrawler();
  });

  it("should parse cses problem - 1068", async () => {
    const result = await crawler.fetchProblem(
      "https://cses.fi/problemset/task/1068"
    );
    const expectedResult: ProblemData = {
      pid: "CSES-1068",
      name: "Weird Algorithm",
      difficulty: 0,
      tags: [],
      url: "https://cses.fi/problemset/task/1068"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await crawler.fetchProblem("https://cses.fi/problemset/task/1068xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
