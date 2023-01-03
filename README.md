# progHours

**_A platform based on gamification to engage students in competitve programming_**

![GitHub Repo stars](https://img.shields.io/github/stars/naimulcsx/proghours?style=social)
![GitHub issues](https://img.shields.io/github/issues/naimulcsx/progHours)
![GitHub commits since tagged version](https://img.shields.io/github/commits-since/naimulcsx/progHours/v0.1.1)

![progHours](./client/public/cover.png)

There is a high learning curve for programming. We can look at beginner level CS courses. They begin with small line by line coding exercises, progress to fill in the blank exercises, and only after quite a while are people comfortable making whole functions and classes. Most people learn to code via scripting languages, which provide instant feedback and clear error messages.

Competitive programming is compelling because of the same reason: fast feedback. You have complete control over whether a program will work or not, and feedback is one dimensional: AC (accepted) or WA (rejected). You finish one problem, learn a trick, and move ahead. This boils down into training your mind to think faster and to think in new ways that no other programmer is capable of.

## Motivation

Motivating students to learn and practice competitive programming is a challenge. However, with the right approach and tools, it is possible to engage and motivate students to learn and improve their skills in this area.

Gamification can be a useful tool to make learning and practicing competitive programming more engaging and enjoyable. It can also be a way to motivate people to keep practicing and improving their skills. This is especially important in competitive programming, where the learning curve is steep and there is always more to learn and improve upon.

## Goals

Please note that this project is highly experimental and we are still working to define and refine our goals. However, we have settled on the following common goals for the project:

- To provide a fun and engaging platform for students to learn and practice competitive programming
- To use gamification techniques, such as leaderboard, points and rewards, to motivate students to learn and improve their skills
- To foster a sense of community and shared accomplishment among students by providing a platform for them to compete with one another and track their progress
- To help students develop a growth mindset and a love of learning through the use of game-like mechanics
- To provide students with the opportunity to showcase their profile and skillls to tech recruiters.

## Features

- [x] Submissions tracking system
  - [x] Supports over 15 online judges
  - [x] Supports vjudge private contests
  - [ ] Automated tracking from online judges (Planned)
- [x] User profile and statistics
- [x] Study list (to bookmark useful resources)
- [x] User activities (show what problems are solved by students in realtime)
- [x] Leaderboard
- [x] Groups
  - [x] Group leaderboard
  - [ ] Problem Lists integration for Groups
- [ ] Problem Lists
- [ ] Reward system
  - [x] Medals based on solve count
  - [ ] Medals based on categories
- [ ] Contest Platform (WIP)
  - [ ] Host contests with custom problemset.
- [x] Role Based Access Control (RBAC)
- [x] User Management
- [ ] Group Management
- [ ] Problem Management

## Online Judge Support

Right now we have support for over 15 Online Judges, but some of them might have a few limitations. You can only add problems that is supported by our systems right now. The work is in progress and we are working hard to make it more flexible and easy.

- **Codeforces**
  - `https://codeforces.com/gym/{gymId}/problem/{problemId}`
  - `https://codeforces.com/problemset/problem/{contestId}/{problemId}`
  - `https://codeforces.com/contest/{contestId}/problem/{problemId}`
- **CodeChef**
  - `https://www.codechef.com/submit/{problemId}`
  - `https://www.codechef.com/problems/{problemId}`
  - `https://www.codechef.com/{contestId}/problems/{problemId}`
- **CSES**
  - `https://cses.fi/problemset/task/{problemId}`
- **UVA**
  - `https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem={problemId}`
- **Toph**
  - `https://toph.co/p/${problemId}`
- **SPOJ**
  - `https://www.spoj.com/problems/${problemId}`
- **Hackerrank**
  - `https://www.hackerrank.com/challenges/{problemId}`
  - `https://www.hackerrank.com/contests/{contestId}/challenges/{problemId}`
- **LightOJ**
  - `https://lightoj.com/problem/{problemId}`
- **AtCoder**
  - `https://atcoder.jp/contests/{contestId}/tasks/{problemId}`
- **EOlymp**
  - `https://www.eolymp.com/en/problems/{problemId}`
- **Leetcode**
  - `https://leetcode.com/problems/${problemId}`
- **Timus**
  - `https://acm.timus.ru/problem.aspx?space=1&num={problemId}`
- **CodeToWin**
  - `https://codeto.win/problem/{problemId}`
- **Kattis**
  - `https://open.kattis.com/problems/${problemId}`
- **Vjudge**
  - Supports `Codeforces`, `Codechef`, `AtCoder`, `LightOJ`, `SPOJ`, `Toph`, `EOlymp` from both problem pages or private contests (need password).

## Tech Stack

- _Frontend:_ React, Mantine, React Query
- _Backend:_ TypeScript, NestJS, Prisma
- _Database:_ PostgreSQL

## Installation

### Prerequisites

- To run this project, you must have `Docker` installed

### Steps

#### Step 1: Clone the Repository

Begin by cloning this repository to your machine, and running it through `Docker Compose`

#### Step 2: Setup environment variables

```
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_PORT=
POSTGRES_DB=
DATABASE_URL=
ACCESS_TOKEN_SECRET=
VJUDGE_USERNAME=
VJUDGE_PASSWORD=
ADMINER_PORT=
```

#### Step 3: Run it through `docker-compose`

```bash
cd progHours
docker-compose -f docker-compose.dev.yml up -d
```

Note: Please use the `docker-compose.prod.yml` when you are deploying the project.

#### Step 4: Run database migrations (only first time)

```bash
docker exec -it api_server sh
npx prisma migrate dev
npx prisma db seed
```

Note: If you are deploying, use `npx prisma migrate deploy` instead of `npx prisma migrate dev`.
