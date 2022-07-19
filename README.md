# progHours

Competitive programmers are always on the lookout for ways to improve their skills. For a participant, sometimes it gets difficult to stay motivated at times. This is where our appcation comes into play. We've tried to gamify the whole experience of Competitive Programming. We have a few primary goals in mind. 

- Help competitive programmers in keeping track of what they are doing throughout their journey.
- Provide a competitive environment for competitive programmers to keep going without slowing down.
- Assist coaches in identifying the most dedicated competitors.

## Features
- [x] Personal tracking system
  - [x] Supports 17 online judges
  - [x] Supports vjudge private contests
  - [ ] Automated tracking from online judges
- [x] User profile and statistics
- [ ] Role Based Access Control (RBAC)
- [ ] Community system
  - [ ] Messaging
  - [ ] Notifications
- [ ] Code execution engine

## Online Judge Support

Right now we have support for 17 Online Judges, but some of them might have a few limitations. You can only add problems that is supported by our systems right now. The work is in progress and we are working hard to make it more flexible and easy for you.

- **Codeforces**
    - ✅ Gym Problems
        - Valid link format
            - `https://codeforces.com/gym/{gymId}/problem/{problemId}`
        - Example links
            - [https://codeforces.com/gym/103562/problem/A](https://codeforces.com/gym/103562/problem/A)
    - ✅ Codeforces rounds
        - Valid link format
            - `https://codeforces.com/problemset/problem/{contestId}/{problemId}`
            - `https://codeforces.com/contest/{contestId}/problem/{problemId}`
        - Example links
            - [https://codeforces.com/problemset/problem/1708/B](https://codeforces.com/problemset/problem/1708/B)
            - [https://codeforces.com/contest/1708/problem/B](https://codeforces.com/contest/1708/problem/B)

## Tech Stack
- *Frontend:* React, TailwindCSS, React Query, Vite
- *Backend:* NodeJS, NestJS, TypeORM
- *Database:* PostgreSQL

## Installation

### Prerequisites

- To run this project, you must have `Docker` installed

### Steps

Begin by cloning this repository to your machine, and running it through `Docker Compose`

```bash
git clone git@github.com:naimulcsx/progHours.git
cd progHours
docker-compose up -d
```


