import { Accordion, Box, Container, Stack, Text, Title } from "@mantine/core";

export function FAQ() {
  return (
    <Box component="section" my={96}>
      <Container size="xs" style={{ textAlign: "center" }}>
        <Stack gap="lg">
          <Title>You probably got many questions</Title>
          <Text size="lg" lh={1.35}>
            So here's a list of things we think you might be wondering about
            when it comes to progHours.
          </Text>
        </Stack>
      </Container>
      <Container size="sm" mt={40}>
        <Accordion>
          {faq.map((q) => (
            <Accordion.Item key={q.value} value={q.value}>
              <Accordion.Control>{q.value}</Accordion.Control>
              <Accordion.Panel>
                <Text>{q.description}</Text>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
}

const faq = [
  {
    value: "Why is the name progHours?",
    description:
      'Since our platform is all about programming, problem-solving and tracking, the first name that came to our mind was "programming hours". We decided to tweak it a bit and came up with "progHours". We liked it and it stuck.'
  },
  {
    value: "How does the leaderboard work?",
    description:
      "The leaderboard ranks users based on how many problems they've solved and the difficulty of those problems."
  },
  {
    value: "How can progHours help educators?",
    description:
      "progHours offers tools for coaches and educators to monitor students' progress, assess their performance."
  },
  {
    value: "When is it coming out?",
    description:
      "We are working hard to get the first public version of progHours out as soon as possible."
  },
  {
    value: "Will I be given access?",
    description:
      "Yes, we will onboard the people on our waitlist based on a first come first serve basis, with a 1000 user limit for our initial version."
  }
];
