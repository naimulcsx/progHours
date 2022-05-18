import axios from "axios"

const API_HOSTNAME = "http://localhost"
const fetchProblem = async (link) => {
  const { data } = await axios.post(`${API_HOSTNAME}/api/parsers/test`, {
    link,
  })
  return data
}

describe("Parsers", () => {
  test("CF Test 1", async () => {
    const data = await fetchProblem(
      "https://codeforces.com/contest/1617/problem/A"
    )
    expect(data).toStrictEqual({
      pid: "CF-1617A",
      name: "Forbidden Subsequence",
      tags: ["constructive algorithms", "greedy", "sortings", "strings"],
      difficulty: 800,
      judge_id: 1,
      link: "https://codeforces.com/contest/1617/problem/A",
    })
  })

  test("CF Test 2", async () => {
    const data = await fetchProblem(
      "https://codeforces.com/problemset/problem/1617/A"
    )
    expect(data).toStrictEqual({
      pid: "CF-1617A",
      name: "Forbidden Subsequence",
      tags: ["constructive algorithms", "greedy", "sortings", "strings"],
      difficulty: 800,
      judge_id: 1,
      link: "https://codeforces.com/contest/1617/problem/A",
    })
  })

  test("CF Gym 1", async () => {
    const data = await fetchProblem(
      "https://codeforces.com/gym/103677/problem/A"
    )
    expect(data).toStrictEqual({
      pid: "Gym-103677A",
      name: "Raiser Mais",
      tags: [],
      difficulty: 0,
      judge_id: 1,
      link: "https://codeforces.com/gym/103677/problem/A",
    })
  })

  test("CC Test 1", async () => {
    const data = await fetchProblem(
      "https://www.codechef.com/START15C/problems/NPAIRS"
    )
    expect(data).toStrictEqual({
      pid: "CC-NPAIRS",
      name: "Nice Pairs",
      tags: [],
      difficulty: 0,
      judge_id: 2,
      link: "https://www.codechef.com/problems/NPAIRS",
    })
  })

  test("CC Test 2", async () => {
    const data = await fetchProblem(
      "https://www.codechef.com/problems/MANIPULATE"
    )
    expect(data).toStrictEqual({
      pid: "CC-MANIPULATE",
      name: "Ezio and Guards",
      tags: [],
      difficulty: 0,
      judge_id: 2,
      link: "https://www.codechef.com/problems/MANIPULATE",
    })
  })

  test("CSES Test 1", async () => {
    const data = await fetchProblem("https://cses.fi/problemset/task/1736")
    expect(data).toStrictEqual({
      pid: "CSES-1736",
      name: "Polynomial Queries",
      tags: [],
      difficulty: 0,
      judge_id: 3,
      link: "https://cses.fi/problemset/task/1736",
    })
  })

  test("UVa Test 1", async () => {
    const data = await fetchProblem(
      "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2421"
    )
    expect(data).toStrictEqual({
      pid: "UVA-11426",
      name: "GCD - Extreme (II)",
      tags: [],
      difficulty: 0,
      judge_id: 4,
      link: "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2421",
    })
  })

  test("Toph Test 1", async () => {
    const data = await fetchProblem(
      "https://toph.co/p/i-did-not-do-the-assignment"
    )
    expect(data).toStrictEqual({
      pid: "TH-i-did-not-do-the-assignment",
      name: "I Did Not Do the Assignment",
      tags: ["brute force", "implementation", "number theory"],
      difficulty: 0,
      judge_id: 5,
      link: "https://toph.co/p/i-did-not-do-the-assignment",
    })
  })

  test("SPOJ Test 1", async () => {
    const data = await fetchProblem("https://www.spoj.com/problems/AGGRCOW/")
    expect(data).toStrictEqual({
      pid: "SPOJ-AGGRCOW",
      name: "Aggressive cows",
      tags: [],
      difficulty: 0,
      judge_id: 6,
      link: "https://www.spoj.com/problems/AGGRCOW",
    })
  })

  test("HackerRank Test 1", async () => {
    const data = await fetchProblem(
      "https://www.hackerrank.com/challenges/2d-array/problem?isFullScreen=true"
    )
    expect(data).toStrictEqual({
      name: "2D Array - DS",
      pid: "HR-2d-array",
      tags: [],
      difficulty: 0,
      judge_id: 7,
      link: "https://www.hackerrank.com/challenges/2d-array",
    })
  })

  test("HackerRank Test 1", async () => {
    const data = await fetchProblem(
      "https://www.hackerrank.com/contests/bootcamp-2021female-mirror-contest/challenges/picking-fruits-1"
    )
    expect(data).toStrictEqual({
      name: "Solve Picking Fruits",
      pid: "HR-picking-fruits-1",
      tags: [],
      difficulty: 0,
      judge_id: 7,
      link: "https://www.hackerrank.com/contests/bootcamp-2021female-mirror-contest/challenges/picking-fruits-1",
    })
  })

  test("HackerRank Test 1", async () => {
    const data = await fetchProblem(
      "https://lightoj.com/problem/lighting-system-design"
    )
    expect(data).toStrictEqual({
      pid: "LOJ-1295",
      name: "Lighting System Design",
      tags: [],
      difficulty: 0,
      judge_id: 8,
      link: "https://lightoj.com/problem/lighting-system-design",
    })
  })
})
