# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0-beta.0] - 2024-03-09

> We've rebuilt progHours from the ground up 🎉, incorporating a more robust architecture and enhanced features for a better user experience.

### Added

- Allow users to add a personal bio to their profiles (#211).
- Allow users to add and showcase skills on their profile (#211).
- Allow filtering submissions by date on user profiles (#211).
- Automated submissions fetching from CodeForces (#202).
- Submission verification system for CodeForces and CodeChef (#225).
- Introduced accent color support for customization, empowering users to personalize their experience (#201).

### Changes

- Created NX monorepo workspace for improved project organization and development efficiency (#191).
- Migrated to Mantine v7 for enhanced UI components (#217).
- Customized data table component for improved UI/UX (#208).
- Recognized the top 3 users in the leaderboard with special accolades (#206).
- Table view alongside each chart visualization to switch between graphical and tabular representations (#216).
- Redis caching for improved performance (#206).
- Using `@proghours/crawler` for retrieving problem and submission data from over 14 online judges. (#200)
- Study List, Groups and Activities are locked out temporarily.
