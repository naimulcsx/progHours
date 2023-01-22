import axios from "axios"
import { useState } from "react"
import { DashboardLayout } from "~/components/templates"
import { Helmet } from "react-helmet-async"
import {
  Accordion,
  Box,
  Button,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core"
import { IconCheck, IconRefresh, IconX } from "@tabler/icons"
import { Prism } from "@mantine/prism"

export interface ParsersStatusTemplateProps {
  testCases: {
    id: number
    title: string
    link: string
    expect: {
      pid: string
      name: string
      tags: string[]
      difficulty: number
      judge_id: number
      link: string
    }
  }[]
}

export default function ParsersStatusTemplate({ testCases }: ParsersStatusTemplateProps) {
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

  return (
    <DashboardLayout>
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
              setStatus({})
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
            {testCases.map((testCase) => {
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
                            <Loader size="xs" /> Testing...
                          </Group>
                        )}
                        {status[testCase.link]?.passing && (
                          <Group spacing="xs">
                            <ThemeIcon color="green" size="sm">
                              <IconCheck size={16} />
                            </ThemeIcon>
                            <Text>OK</Text>
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
                            <Text>{status[testCase.link]?.errorMessage}</Text>
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
                            <Prism language="json">
                              {JSON.stringify(status[testCase.link]?.response, null, 2)}
                            </Prism>
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

function deepEqual(x: { [key: string]: any }, y: { [key: string]: any }): boolean {
  return x && y && typeof x === "object" && typeof y === "object"
    ? Object.keys(x).length === Object.keys(y).length &&
        Object.keys(x).reduce(function (isEqual, key) {
          return isEqual && deepEqual(x[key], y[key])
        }, true)
    : x === y
}
