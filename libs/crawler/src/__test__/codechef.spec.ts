import { CodeChefCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("CodeChef crawler", () => {
  let crawler: CodeChefCrawler;

  beforeEach(() => {
    crawler = new CodeChefCrawler();
  });

  it("should parse codechef problem - PREFONES (problemset link)", async () => {
    const result = await crawler.fetchProblem(
      "https://www.codechef.com/problems/PREFONES"
    );
    const expectedResult: ProblemData = {
      pid: "CC-PREFONES",
      name: "Prefix Ones",
      difficulty: 1455,
      tags: ["greedy"],
      url: "https://www.codechef.com/problems/PREFONES"
    };
    expect(result).toEqual(expectedResult);
  });
});
