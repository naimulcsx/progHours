![progHours](./docs/assets/cover.png?)

> _Update: We're excited to announce that the public beta is just around the corner! 🎉 We've completely rebuilt progHours from the ground up._

# progHours

**_A gamification-driven platform for competitive programmers._**

![GitHub Repo stars](https://img.shields.io/github/stars/naimulcsx/proghours?style=social)
![GitHub issues](https://img.shields.io/github/issues/naimulcsx/progHours)

## What is progHours?

progHours is an effort to combine problem-solving and gamification techniques to create a platform tailored for competitive programmers. This platform offers valuable analytics to foster user engagement and encourages them to compete with one another. It also helps coaches by offering valuable insights through comprehensive analytics to monitor and assess student progress.

## Motivation and Goals

This project is experimental and we are working to define and refine our goals. However, we have settled on the following common goals for the project:

- To provide comprehensive analytics on your problem-solving journey.
- To use gamification techniques, such as leaderboard, points and rewards, to engage students in competitive programming and compete with others.
- To provide coaches with valuable insights through comprehensive analytics to monitor and assess student progress.
- To foster a sense of community and shared accomplishment among students.
- To provide users with the opportunity to showcase their problem-solving skills to the recruiters.

## Online Judge Support

Currently, we provide support for 14 Online Judges. Users can only track problems from supported online judges. We've created this library called `@proghours/crawler`, which is responsible for collecting problem and submissions data data from supported Online Judges. To learn more about it please explore the details [here](https://github.com/naimulcsx/progHours/tree/development/libs/crawler).

## Tech Stack

- Nx, TypeScript, React, Mantine, TanStack Query, Playwright
- NestJS, PostgreSQL, Prisma, Redis, BullMQ, Bull Board, Jest
- Docker, Docker Compose, Pino, Prometheus, Grafana, Loki

## Local development

### Prerequisites

- NodeJS
- Docker

### Steps

#### Step 1: Clone the Repository

Begin by cloning this repository to your machine.

```
git clone git@github.com:naimulcsx/progHours.git
```

#### Step 2: Install the dependencies

Install the dependencies.

```bash
npm install
```

#### Step 3: Run necessary components

Navigate to the `progHours` directory and run the components using docker-compose.

```bash
cd progHours
docker-compose -f docker-compose.yml up -d
```

#### Step 4: Run database migrations

If you are setting up for the first time, you need to run database migrations

```bash
npm run db:migrate
```

#### Step 5: Launch the project

Launch the project by running the following command.

```bash
npm run dev
```

### Running E2E Tests

You can execute the end-to-end (E2E) tests using Playwright by running the following command in your terminal. The tests will run in a headless browser environment, and the test results will be displayed in the console.

```bash
nx run client:e2e
```

If you want to explore, run and debug tests with a time travel experience, you can use the Playwright's UI mode. o open UI mode, run the following command in your terminal:

```bash
nx run client:e2e --ui
```
