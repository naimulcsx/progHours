import { KattisCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("Kattis crawler", () => {
  let crawler: KattisCrawler;

  beforeEach(() => {
    crawler = new KattisCrawler();
  });

  it("should parse Kattis problem - sequences", async () => {
    const result = await crawler.fetchProblem(
      "https://open.kattis.com/problems/sequences"
    );
    const expectedResult: ProblemData = {
      name: "0-1 Sequences",
      pid: "KT-sequences",
      difficulty: 0,
      url: "https://open.kattis.com/problems/sequences",
      tags: []
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error with invalid problem id", async () => {
    try {
      await crawler.fetchProblem(
        "https://open.kattis.com/problems/sequences-xyz"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
