import * as request from "supertest"
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
})
