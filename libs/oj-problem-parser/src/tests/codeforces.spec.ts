import { OJProblemParser } from "../core/OJProblemParser";
import { ParseResult } from "../types/ParseResult";

describe("OJProblemParser", () => {
  let parser: OJProblemParser;

  beforeEach(() => {
    parser = new OJProblemParser();
  });

  it("should have parse method", () => {
    expect(parser.parse).toBeDefined();
  });

  it("codeforces problemset link: 1826B", async () => {
    const result = await parser.parse(
      "https://codeforces.com/problemset/problem/1826/B"
    );
    const expectedResult: ParseResult = {
      pid: "CF-1826B",
      name: "Lunatic Never Content",
      difficulty: 1000,
      tags: ["math", "number theory"],
      url: "https://codeforces.com/contest/1826/problem/B"
    };
    expect(result).toEqual(expectedResult);
  });

  it("codeforces contest link: 1826B", async () => {
    const result = await parser.parse(
      "https://codeforces.com/contest/1826/problem/C"
    );
    const expectedResult: ParseResult = {
      pid: "CF-1826C",
      name: "Dreaming of Freedom",
      difficulty: 1500,
      tags: ["greedy", "math", "number theory"],
      url: "https://codeforces.com/contest/1826/problem/C"
    };
    expect(result).toEqual(expectedResult);
  });

  it("codeforces group link: 219158A", async () => {
    const result = await parser.parse(
      "https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/A"
    );
    const expectedResult: ParseResult = {
      pid: "CF-219158A",
      name: "Say Hello With C++",
      difficulty: 0,
      tags: [],
      url: "https://codeforces.com/group/MWSDmqGsZm/contest/219158/problem/A"
    };
    expect(result).toEqual(expectedResult);
  });
});
