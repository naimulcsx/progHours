# progHours

Competitive programmers are always on the lookout for ways to improve their skills. For a participant, sometimes it gets difficult to stay motivated at times. This is where our appcation comes into play. We've tried to gamify the whole experience of Competitive Programming. We have a few primary goals in mind. 

- Help competitive programmers in keeping track of what they are doing throughout their journey.
- Provide a competitive environment for competitive programmers to keep going without slowing down.
- Assist coaches in identifying the most dedicated competitors.

## Features
- [x] Personal tracking system
  - [x] Supports 17 online judges
  - [x] supports vjudge private contests
  - [ ] Automated tracking from online judges
- [x] User profile and statistics
- [ ] Role Based Access Control (RBAC)
- [ ] Community system
  - [ ] Messaging
  - [ ] Notifications
- [ ] Code execution engine

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
