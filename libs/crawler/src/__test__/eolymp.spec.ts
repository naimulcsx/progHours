import { EolympCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("Eolymp crawler", () => {
  let crawler: EolympCrawler;

  beforeEach(() => {
    crawler = new EolympCrawler();
  });

  it("should parse Eolymp problem - 24", async () => {
    const result = await crawler.fetchProblem(
      "https://www.eolymp.com/en/problems/24"
    );
    const expectedResult: ProblemData = {
      pid: "Eolymp-24",
      name: "Paint2D-Crack",
      difficulty: 0,
      url: "https://eolymp.com/en/problems/24",
      tags: []
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await crawler.fetchProblem("https://www.eolymp.com/en/problems/24xyz");
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
