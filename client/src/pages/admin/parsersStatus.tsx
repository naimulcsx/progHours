import { DashboardLayout } from "~/components/layouts/Dashboard"
import { Helmet } from "react-helmet-async"
import { Accordion, Box, Button, Group, Loader, Paper, SimpleGrid, Text, ThemeIcon, Title } from "@mantine/core"
import { IconCheck, IconRefresh, IconX } from "@tabler/icons"
import { Prism } from "@mantine/prism"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"

const testCases = [
  {
    id: 1,
    title: "Codeforces Test 1",
    link: "https://codeforces.com/contest/1617/problem/A",
    expect: {
      pid: "CF-1617A",
      name: "Forbidden Subsequence",
      tags: ["constructive algorithms", "greedy", "sortings", "strings"],
      difficulty: 800,
      judge_id: 1,
      link: "https://codeforces.com/contest/1617/problem/A",
    },
  },
  {
    id: 3,
    title: "Codeforces Gym 1",
    link: "https://codeforces.com/gym/103677/problem/A",
    expect: {
      pid: "Gym-103677A",
      name: "Raiser Mais",
      tags: [],
      difficulty: 0,
      judge_id: 1,
      link: "https://codeforces.com/gym/103677/problem/A",
    },
  },
  {
    id: 4,
    title: "CodeChef Test 1",
    link: "https://www.codechef.com/START15C/problems/NPAIRS",
    expect: {
      pid: "CC-NPAIRS",
      name: "Nice Pairs",
      tags: ["string", "brute force"],
      difficulty: 1564,
      judge_id: 2,
      link: "https://www.codechef.com/problems/NPAIRS",
    },
  },
  {
    id: 5,
    title: "CodeChef Test 2",
    link: "https://www.codechef.com/problems/MANIPULATE",
    expect: {
      pid: "CC-MANIPULATE",
      name: "Ezio and Guards",
      tags: ["conditional statements"],
      difficulty: 427,
      judge_id: 2,
      link: "https://www.codechef.com/problems/MANIPULATE",
    },
  },
  {
    id: 6,
    title: "CSES Test 1",
    link: "https://cses.fi/problemset/task/1736",
    expect: {
      pid: "CSES-1736",
      name: "Polynomial Queries",
      tags: [],
      difficulty: 0,
      judge_id: 3,
      link: "https://cses.fi/problemset/task/1736",
    },
  },
  {
    id: 7,
    title: "UVa Test 1",
    link: "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2421",
    expect: {
      pid: "UVA-11426",
      name: "GCD - Extreme (II)",
      tags: [],
      difficulty: 0,
      judge_id: 4,
      link: "https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2421",
    },
  },
  {
    id: 8,
    title: "Toph Test 1",
    link: "https://toph.co/p/i-did-not-do-the-assignment",
    expect: {
      pid: "Toph-i-did-not-do-the-assignment",
      name: "I Did Not Do the Assignment",
      tags: ["brute force", "implementation", "number theory"],
      difficulty: 0,
      judge_id: 5,
      link: "https://toph.co/p/i-did-not-do-the-assignment",
    },
  },
  {
    id: 9,
    title: "SPOJ Test 1",
    link: "https://www.spoj.com/problems/AGGRCOW/",
    expect: {
      pid: "SPOJ-AGGRCOW",
      name: "Aggressive cows",
      tags: [],
      difficulty: 0,
      judge_id: 6,
      link: "https://www.spoj.com/problems/AGGRCOW",
    },
  },
  {
    id: 10,
    title: "HackerRank Test 1",
    link: "https://www.hackerrank.com/challenges/2d-array/problem?isFullScreen=true",
    expect: {
      name: "2D Array - DS",
      pid: "HR-2d-array",
      tags: [],
      difficulty: 0,
      judge_id: 7,
      link: "https://www.hackerrank.com/challenges/2d-array",
    },
  },
  {
    id: 11,
    title: "HackerRank Test 2",
    link: "https://www.hackerrank.com/contests/bootcamp-2021female-mirror-contest/challenges/picking-fruits-1",
    expect: {
      name: "Solve Picking Fruits",
      pid: "HR-picking-fruits-1",
      tags: [],
      difficulty: 0,
      judge_id: 7,
      link: "https://www.hackerrank.com/contests/bootcamp-2021female-mirror-contest/challenges/picking-fruits-1",
    },
  },
  {
    id: 12,
    title: "LightOJ Test 1",
    link: "https://lightoj.com/problem/lighting-system-design",
    expect: {
      pid: "LOJ-1295",
      name: "Lighting System Design",
      tags: [],
      difficulty: 0,
      judge_id: 8,
      link: "https://lightoj.com/problem/lighting-system-design",
    },
  },
  {
    id: 13,
    title: "Atcoder Test 1",
    link: "https://atcoder.jp/contests/arc123/tasks/arc123_a",
    expect: {
      pid: "AC-arc123_a",
      name: "Arithmetic Sequence",
      tags: [],
      difficulty: 0,
      judge_id: 9,
      link: "https://atcoder.jp/contests/arc123/tasks/arc123_a",
    },
  },
  {
    id: 14,
    title: "Eolymp Test 1",
    link: "https://eolymp.com/en/problems/9655",
    expect: {
      pid: "Eolymp-9655",
      name: "Mr. Nine and his love for mangoes",
      tags: [],
      difficulty: 0,
      judge_id: 10,
      link: "https://www.eolymp.com/en/problems/9655",
    },
  },
  {
    id: 15,
    title: "LeetCode Test 1",
    link: "https://leetcode.com/problems/first-bad-version",
    expect: {
      pid: "LC-278",
      name: "First Bad Version",
      tags: [],
      difficulty: 0,
      judge_id: 12,
      link: "https://leetcode.com/problems/first-bad-version",
    },
  },
  {
    id: 16,
    title: "Timus Test 1",
    link: "https://acm.timus.ru/problem.aspx?space=1&num=1203",
    expect: {
      pid: "Tim-1203",
      name: "Scientific Conference",
      tags: [],
      difficulty: 0,
      judge_id: 13,
      link: "https://acm.timus.ru/problem.aspx?space=1&num=1203",
    },
  },
  {
    id: 17,
    title: "CodeToWin Test 1",
    link: "https://codeto.win/problem/1154",
    expect: {
      pid: "CW-1154",
      name: "Easy ??",
      tags: [],
      difficulty: 0,
      judge_id: 14,
      link: "https://codeto.win/problem/1154",
    },
  },
  {
    id: 18,
    title: "Kattis OJ Test 1",
    link: "https://open.kattis.com/problems/hello",
    expect: {
      pid: "KT-hello",
      name: "Hello World!",
      tags: [],
      difficulty: 0,
      judge_id: 17,
      link: "https://open.kattis.com/problems/hello",
    },
  },
]

function deepEqual(x: { [key: string]: any }, y: { [key: string]: any }): boolean {
  return x && y && typeof x === "object" && typeof y === "object"
    ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).reduce(function (isEqual, key) {
          return isEqual && deepEqual(x[key], y[key])
        }, true)
    : x === y
}

export default function ParsersStatus() {
  const [activeAccordion, setActiveAccordion] = useState("1")
  const [testing, setTesting] = useState(false)
  const [status, setStatus] = useState<{ [key: string]: any }>({})

  const startTesting = async () => {
    for (let i = 0; i < testCases.length; ++i) {
      const testCase = testCases[i]

      setStatus((prev) => ({
        ...prev,
        [testCase.link]: {
          loading: true,
        },
      }))

      await new Promise((resolve) => setTimeout(resolve, 500))

      setActiveAccordion(testCase.id.toString())

      try {
        const { data } = await axios.post("/api/parsers/debug", {
          link: testCase.link,
        })

        setStatus((prev) => ({
          ...prev,
          [testCase.link]: {
            loading: false,
            passing: deepEqual(testCase.expect, data),
            response: data,
          },
        }))

        console.log(data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message

          setStatus((prev) => ({
            ...prev,
            [testCase.link]: {
              loading: false,
              error: true,
              errorMessage: message,
            },
          }))
        }
      }
    }
    setTesting(false)
  }

  useEffect(() => {
    console.log(status)
  }, [status])

  return (
    <DashboardLayout>
      {/* @ts-ignore */}
      <Helmet>
        <title>Parsers Status</title>
      </Helmet>
      <Box sx={{ maxWidth: "1024px", margin: "0 auto" }}>
        <Group align="center" mb="md" position="apart">
          <Title order={3}>Parsers healthcheck</Title>
          <Button
            size="xs"
            leftIcon={<IconRefresh size={16} />}
            loading={testing}
            onClick={() => {
              setTesting(true)
              startTesting()
            }}
          >
            Start healthcheck
          </Button>
        </Group>
        <Paper>
          <Accordion
            value={activeAccordion}
            sx={(theme) => ({ overflow: "clip", borderRadius: theme.radius.md })}
            onChange={(value) => (value ? setActiveAccordion(value) : null)}
          >
            {testCases.map((testCase, index) => {
              const [loading, setLoading] = useState(false)
              return (
                <Accordion.Item value={testCase.id.toString()} key={testCase.id}>
                  <Accordion.Control>
                    <Group position="apart">
                      <Title order={5} sx={{ fontWeight: 500 }}>
                        {testCase.title}
                      </Title>
                      <Group spacing="xs">
                        {status[testCase.link]?.loading && (
                          <Group spacing="xs">
                            {" "}
                            <Loader size="xs" /> Testing
                          </Group>
                        )}
                        {status[testCase.link]?.passing && (
                          <Group spacing="xs">
                            <ThemeIcon color="green" size="sm">
                              <IconCheck size={16} />
                            </ThemeIcon>
                            <Text>Passing</Text>
                          </Group>
                        )}

                        {status[testCase.link]?.passing === false && (
                          <Group spacing="xs">
                            <ThemeIcon color="red" size="sm">
                              <IconX size={16} />
                            </ThemeIcon>
                            <Text>Data mismatch</Text>
                          </Group>
                        )}

                        {status[testCase.link]?.error && (
                          <Group spacing="xs">
                            <ThemeIcon color="red" size="sm">
                              <IconX size={16} />
                            </ThemeIcon>
                            <Text>Parser down</Text>
                          </Group>
                        )}
                      </Group>
                    </Group>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <SimpleGrid
                      cols={2}
                      spacing="lg"
                      breakpoints={[
                        { maxWidth: 980, cols: 2, spacing: "sm" },
                        { maxWidth: 600, cols: 1, spacing: "sm" },
                      ]}
                    >
                      <Box>
                        <Title order={5} mb="sm">
                          Expected response
                        </Title>
                        <Prism language="json">{JSON.stringify(testCase.expect, null, 2)}</Prism>
                      </Box>
                      <Box>
                        {status[testCase.link]?.passing && (
                          <>
                            <Title order={5} mb="sm">
                              Response from parsers service
                            </Title>
                            <Prism language="json">{JSON.stringify(status[testCase.link]?.response, null, 2)}</Prism>
                          </>
                        )}
                      </Box>
                    </SimpleGrid>
                  </Accordion.Panel>
                </Accordion.Item>
              )
            })}
          </Accordion>
        </Paper>
      </Box>
    </DashboardLayout>
  )
}
