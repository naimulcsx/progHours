# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **Recent Activities**: Now you can see what others are solving
- **Leaderboard Filters**: You can filter leaderboard on various criteria: by batch / solve count / solve time etc.

### Fixed

- Fixed a Bug where the handle was not changing on profile pages.
- Allow registration for other departments.

## [0.2.0] - 2022-08-13

### Added

- **User groups:** Admin can create groups with a group of users.
- Smoother loading for leaderboard, profile, dashboard etc.
- UI: Dark Mode Support and various UI improvements 🎉

### Fixed

- Submission entry where date was not changing.
- Fixed Kattis parser where the problem name we were getting was empty. #176
- Cookie is automatically getting deleted because of not specifying the `maxAge` #179

## [0.1.1] - 2022-07-20

### Added

- Added a docker-compose config for production environment

### Changes

- Updated UVA and CSES SVG icon in frontend.
- **CodeChef parser:** Updated CodeChef parser to handle `/submit/{problemId}` pattern. Fetch `tags` and `difficulty` through the API.

### Fixed

- **CSES parser:** handle links of valid pattern where the problem doesn't exist.
- Fixed some of the responsiveness issues in frontend.
- Random charecters getting placed in Tags Frequency chart.

## [0.1.0] - 2022-07-17

### Added

- **Submissions:** Users are able to add their submissions from over 15 different online judges and they appear under in a single dashboard.
- **Problem parsers:** Ability to fetch problem data from over 15 different online judges: `Codeforces`, `CodeChef`, `CSES`, `UVA`, `Toph`, `SPOJ`, `HackerRank`, `LightOJ`, `AtCoder`, `Eolymp`, `Beecrowd`, `LeetCode`, `Timus`, `CodeToWin`, `UVALive`, `HackerEarth`, `Kattis`.
- **Study List:** Ability to keep track of user's studies what he is learning, how much time he is spending and so on.
- **Leaderboard:** Users are ranked according to their submissions based on number of solved problems, amount of time needed, problem difficulties etc.
- **User profile:** A public profile that provides detailed information about what a participant has done in his entire competitive programming journey.
