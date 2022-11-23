import axios from "axios"

const API_HOSTNAME = "http://localhost"
const fetchProblem = async (link) => {
  const { data } = await axios.post(`${API_HOSTNAME}/api/parsers/debug`, {
    link,
  })
  return data
}

describe("Parsers", () => {
  test("CF Test 1", async () => {
    const data = await fetchProblem("https://codeforces.com/contest/1617/problem/A")
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
    const data = await fetchProblem("https://codeforces.com/problemset/problem/1617/A")
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
    const data = await fetchProblem("https://codeforces.com/gym/103677/problem/A")
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
    const data = await fetchProblem("https://www.codechef.com/START15C/problems/NPAIRS")
    expect(data).toStrictEqual({
      pid: "CC-NPAIRS",
      name: "Nice Pairs",
      tags: ["string", "brute force"],
      difficulty: 1564,
      judge_id: 2,
      link: "https://www.codechef.com/problems/NPAIRS",
    })
  })

  test("CC Test 2", async () => {
    const data = await fetchProblem("https://www.codechef.com/problems/MANIPULATE")
    expect(data).toStrictEqual({
      pid: "CC-MANIPULATE",
      name: "Ezio and Guards",
      tags: ["conditional statements"],
      difficulty: 427,
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
    const data = await fetchProblem("https://toph.co/p/i-did-not-do-the-assignment")
    expect(data).toStrictEqual({
      pid: "Toph-i-did-not-do-the-assignment",
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
    const data = await fetchProblem("https://www.hackerrank.com/challenges/2d-array/problem?isFullScreen=true")
    expect(data).toStrictEqual({
      name: "2D Array - DS",
      pid: "HR-2d-array",
      tags: [],
      difficulty: 0,
      judge_id: 7,
      link: "https://www.hackerrank.com/challenges/2d-array",
    })
  })

  test("HackerRank Test 2", async () => {
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

  test("LightOJ Test", async () => {
    const data = await fetchProblem("https://lightoj.com/problem/lighting-system-design")
    expect(data).toStrictEqual({
      pid: "LOJ-1295",
      name: "Lighting System Design",
      tags: [],
      difficulty: 0,
      judge_id: 8,
      link: "https://lightoj.com/problem/lighting-system-design",
    })
  })

  test("Atcoder Test", async () => {
    const data = await fetchProblem("https://atcoder.jp/contests/arc123/tasks/arc123_a")
    expect(data).toStrictEqual({
      pid: "AC-arc123_a",
      name: "Arithmetic Sequence",
      tags: [],
      difficulty: 0,
      judge_id: 9,
      link: "https://atcoder.jp/contests/arc123/tasks/arc123_a",
    })
  })

  test("EOlymp Test", async () => {
    const data = await fetchProblem("https://eolymp.com/en/problems/9655")
    expect(data).toStrictEqual({
      pid: "Eolymp-9655",
      name: "Mr. Nine and his love for mangoes",
      tags: [],
      difficulty: 0,
      judge_id: 10,
      link: "https://www.eolymp.com/en/problems/9655",
    })
  })

  // test("BeeCrowd Test", async () => {
  //   const data = await fetchProblem("https://www.beecrowd.com.br/judge/en/problems/view/1004")
  //   expect(data).toStrictEqual({
  //     pid: "BC-1004",
  //     name: "Simple Product",
  //     tags: [],
  //     difficulty: 0,
  //     judge_id: 11,
  //     link: "https://www.beecrowd.com.br/judge/en/problems/view/1004",
  //   })
  // })

  test("LeetCode Test", async () => {
    const data = await fetchProblem("https://leetcode.com/problems/first-bad-version/")
    expect(data).toStrictEqual({
      pid: "LC-278",
      name: "First Bad Version",
      tags: [],
      difficulty: 0,
      judge_id: 12,
      link: "https://leetcode.com/problems/first-bad-version",
    })
  })

  test("Timus OJ Test", async () => {
    const data = await fetchProblem("https://acm.timus.ru/problem.aspx?space=1&num=1203")
    expect(data).toStrictEqual({
      pid: "Tim-1203",
      name: "Scientific Conference",
      tags: [],
      difficulty: 0,
      judge_id: 13,
      link: "https://acm.timus.ru/problem.aspx?space=1&num=1203",
    })
  })

  test("CodeToWin OJ Test", async () => {
    const data = await fetchProblem("https://codeto.win/problem/1154")
    expect(data).toStrictEqual({
      pid: "CW-1154",
      name: "Easy ??",
      tags: [],
      difficulty: 0,
      judge_id: 14,
      link: "https://codeto.win/problem/1154",
    })
  })

  // test("ICPCArchive Test", async () => {
  //   const data = await fetchProblem(
  //     "https://icpcarchive.ecs.baylor.edu/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=6100"
  //   )
  //   expect(data).toStrictEqual({
  //     pid: "CW-1154",
  //     name: "Easy ??",
  //     tags: [],
  //     difficulty: 0,
  //     judge_id: 15,
  //     link: "https://icpcarchive.ecs.baylor.edu/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=6100",
  //   })
  // })

  // test("HackerEarth OJ Test 1", async () => {
  //   const data = await fetchProblem(
  //     "https://www.hackerearth.com/practice/basic-programming/input-output/basics-of-input-output/practice-problems/algorithm/make-all-equal-90a21ab2/"
  //   )
  //   expect(data).toStrictEqual({
  //     pid: "HE-90a21ab2",
  //     name: "Number of steps",
  //     tags: [],
  //     difficulty: 0,
  //     judge_id: 16,
  //     link: "https://www.hackerearth.com/practice/basic-programming/input-output/basics-of-input-output/practice-problems/algorithm/make-all-equal-90a21ab2",
  //   })
  // })

  // test("HackerEarth OJ Test 2", async () => {
  //   const data = await fetchProblem("https://www.hackerearth.com/problem/algorithm/sequence-236-65ae2348-9a337d41/")
  //   expect(data).toStrictEqual({
  //     pid: "HE-9a337d41",
  //     name: "Elements of the sequence",
  //     tags: [],
  //     difficulty: 0,
  //     judge_id: 16,
  //     link: "https://www.hackerearth.com/problem/algorithm/sequence-236-65ae2348-9a337d41",
  //   })
  // })

  // test("Kattis OJ Test 1", async () => {
  //   const data = await fetchProblem("https://open.kattis.com/contests/pfitti/problems/cakeymccakeface")
  //   console.log(data)
  //   expect(data).toStrictEqual({
  //     pid: "KT-cakeymccakeface",
  //     name: "Problem ACakey McCakeFace",
  //     tags: [],
  //     difficulty: 0,
  //     judge_id: 17,
  //     link: "https://open.kattis.com/contests/pfitti/problems/cakeymccakeface",
  //   })
  // })

  test("Kattis OJ Test 2", async () => {
    const data = await fetchProblem("https://open.kattis.com/problems/hello")
    expect(data).toStrictEqual({
      pid: "KT-hello",
      name: "Hello World!",
      tags: [],
      difficulty: 0,
      judge_id: 17,
      link: "https://open.kattis.com/problems/hello",
    })
  })
})
