import { CodeforcesCrawler } from "../crawlers";
import { ProblemData } from "../interfaces";

describe("Codeforces crawler", () => {
  let crawler: CodeforcesCrawler;

  beforeEach(() => {
    crawler = new CodeforcesCrawler();
  });

  it("should parse codeforces problem - 1826B (problemset link)", async () => {
    const result = await crawler.fetchProblem(
      "https://codeforces.com/problemset/problem/1826/B"
    );
    const expectedResult: ProblemData = {
      pid: "CF-1826B",
      name: "Lunatic Never Content",
      difficulty: 1100,
      tags: ["math", "number theory"],
      url: "https://codeforces.com/contest/1826/problem/B"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse codeforces problem - 1826C (contest link)", async () => {
    const result = await crawler.fetchProblem(
      "https://codeforces.com/contest/1826/problem/C"
    );
    const expectedResult: ProblemData = {
      pid: "CF-1826C",
      name: "Dreaming of Freedom",
      difficulty: 1300,
      tags: ["greedy", "math", "number theory"],
      url: "https://codeforces.com/contest/1826/problem/C"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse codeforces problem - 219158A (group link)", async () => {
    const result = await crawler.fetchProblem(
      "https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/A"
    );
    const expectedResult: ProblemData = {
      pid: "CF-219158A",
      name: "Say Hello With C++",
      difficulty: 0,
      tags: [],
      url: "https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/A"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse codeforces problem - 219158B (group link and without https)", async () => {
    const result = await crawler.fetchProblem(
      "http://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/B"
    );
    const expectedResult: ProblemData = {
      pid: "CF-219158B",
      name: "Basic Data Types",
      difficulty: 0,
      tags: [],
      url: "https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/B"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse codeforces problem - 1826D (with www in the url)", async () => {
    const result = await crawler.fetchProblem(
      "https://www.codeforces.com/problemset/problem/1826/D"
    );
    const expectedResult: ProblemData = {
      pid: "CF-1826D",
      name: "Running Miles",
      difficulty: 1700,
      tags: ["brute force", "dp", "greedy"],
      url: "https://codeforces.com/contest/1826/problem/D"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should parse codeforces problem - 1826E (without https and www in the url)", async () => {
    const result = await crawler.fetchProblem(
      "http://www.codeforces.com/problemset/problem/1826/E"
    );
    const expectedResult: ProblemData = {
      pid: "CF-1826E",
      name: "Walk the Runway",
      difficulty: 2400,
      tags: [
        "bitmasks",
        "brute force",
        "data structures",
        "dp",
        "graphs",
        "implementation",
        "sortings"
      ],
      url: "https://codeforces.com/contest/1826/problem/E"
    };
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error if there is any typo on the url", async () => {
    try {
      await crawler.fetchProblem(
        "https://codeforcess.com/problemset/problem/1826/E"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it("should throw an error if the problem does not exist (eg. 1826Z)", async () => {
    try {
      await crawler.fetchProblem(
        "https://codeforces.com/problemset/problem/1826/Z"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  it("should throw an error if the contest is invalid (eg. 182699Z)", async () => {
    try {
      await crawler.fetchProblem(
        "https://codeforces.com/problemset/problem/182699/A"
      );
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });
});
