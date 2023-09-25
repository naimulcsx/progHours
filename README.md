![progHours](./docs/assets/cover.png?)

> _Update: We're excited to announce that the public beta is just around the corner! 🎉 We've completely rebuilt progHours from the ground up._

# progHours

**_A platform based on gamification to engage students in competitve programming_**

![GitHub Repo stars](https://img.shields.io/github/stars/naimulcsx/proghours?style=social)
![GitHub issues](https://img.shields.io/github/issues/naimulcsx/progHours)

## What is progHours?

progHours is an effort to combine problem-solving and gamification techniques to build a platform that will motivate users to keep improving their skills and compete with each other. It also helps coaches by offering valuable insights through comprehensive analytics to monitor and assess student progress.

## Motivation and Goals

We noticed that motivating students to engage in problem-solving is challenging. To solve this, we took the initiative to develop a platform that integrates gamification techniques, aiming to boost student engagement with problem-solving and foster peer competition within a community.

This project is experimental and we are working to define and refine our goals. However, we have settled on the following common goals for the project:

- To provide comprehensive analytics on your problem-solving journey.

- To use gamification techniques, such as leaderboard, points and rewards, to motivate students to learn and compete with others.

- To provide coaches with valuable insights through comprehensive analytics to monitor and assess student progress.

- To foster a sense of community and shared accomplishment among students.

- To provide students with the opportunity to showcase their profile and skillls to tech recruiters.

## Tech Stack

- TypeScript, React, React Router, Mantine, TanStack Query
- NestJS, PostgreSQL, Prisma, Redis, BullMQ, Bull Board
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
yarn install
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
