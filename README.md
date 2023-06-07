![progHours](./docs/assets/cover.png)

# progHours
**_A platform based on gamification to engage students in competitve programming_**

![GitHub Repo stars](https://img.shields.io/github/stars/naimulcsx/proghours?style=social)
![GitHub issues](https://img.shields.io/github/issues/naimulcsx/progHours)

Motivating students to learn and practice competitive programming is a challenge. However, with the right approach and tools, it is possible to engage and motivate students to learn and improve their skills in this area.

Gamification can be a useful tool to make learning and practicing competitive programming more engaging and enjoyable. It can also be a way to motivate people to keep practicing and improving their skills. This is especially important in competitive programming, where the learning curve is steep and there is always more to learn and improve upon.

## Goals
Please note that this project is highly experimental and we are working to define and refine our goals. However, we have settled on the following common goals for the project:

- To provide a fun and engaging platform for students to learn and practice competitive programming.
- To use gamification techniques, such as leaderboard, points and rewards, to motivate students to learn and improve their skills.
- To foster a sense of community and shared accomplishment among students by providing a platform for them to compete with one another and track their progress.
- To help students develop a growth mindset and a love of learning through the use of game-like mechanics.
- To provide students with the opportunity to showcase their profile and skillls to tech recruiters.

## Features

- [x] Submissions tracking system
  - [x] Supports 14 online judges
  - [x] Supports VJudge private contests
  - [ ] Automated tracking from online judges [Planned]
- [x] User profile and statistics
- [x] Study List
- [x] User activities
- [x] Leaderboard
- [x] Groups
  - [x] Group Leaderboard
  - [x] Problem List Integration
- [x] Problem List
- [ ] Reward system
  - [x] Medals based on solve count
  - [ ] Medals based on categories
- [ ] Contest Platform [Planned]
  - [ ] Integrate with [go-sandbox](https://github.com/criyle/go-sandbox)
  - [ ] Host contests with custom problemset.
- [x] Role Based Access Control (RBAC)
- [ ] Admin Panel
  - [x] User Management
  - [x] Group Management
  - [x] Problem Management
  - [x] Parsers Health Test

## Online Judge Support
We have support for 14 Online Judges, you can add any problem from these Online Judges. To make it happen, we've built a separate library called `oj-problem-parser` [Read More](https://github.com/naimulcsx/progHours/tree/development/libs/oj-problem-parser)

## Tech Stack

- _Frontend:_ React, Mantine, React Query
- _Backend:_ TypeScript, NestJS, Prisma
- _Database:_ PostgreSQL



## Installation

### Prerequisites

- To run this project, you must have `Docker` installed

### Steps

#### Step 1: Clone the Repository

Begin by cloning this repository to your machine, and install all the dependencies.

```bash
yarn install
```

#### Step 2: Setup environment variables

```
PORT=3333
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/proghours?schema=public"
JWT_SECRET=YOUR_SECRET_HERE
```

#### Step 3: Run it through `docker-compose`

```bash
cd progHours
docker-compose -f docker-compose.yml up -d
```

#### Step 4: Run database migrations (only during the initial setup)

```bash
yarn db:migrate
```

**Note: This project is currently undergoing a massive refactoring process. As a result, the contents of the current branch may not include all the features or functionalities you might be expecting.**
