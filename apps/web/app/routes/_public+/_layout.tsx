import { Anchor, Button, Container, Group, Text } from '@mantine/core';
import { Link, Outlet } from '@remix-run/react';

import { AppLogo } from '~/assets/app-logo';

export default function PublicLayout() {
  return (
    <div>
      <header className="border-b border-gray-200">
        <Container size="xl" py="md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-12">
              <Link to="/">
                <AppLogo className="text-primary h-8 w-8" />
              </Link>
              <ul className="hidden gap-4 sm:flex">
                <li>
                  <Anchor size="sm" component={Link} to="/" underline="never">
                    Home
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    size="sm"
                    component={Link}
                    to="/leaderboard"
                    underline="never"
                  >
                    Leaderboard
                  </Anchor>
                </li>
                <li>
                  <Anchor
                    size="sm"
                    component={Link}
                    to="https://github.com/progHours/progHours"
                    underline="never"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </Anchor>
                </li>
              </ul>
            </div>
            <Group>
              <Button component={Link} to="/auth/sign-in" variant="light">
                Sign in
              </Button>
              <Button component={Link} to="/auth/sign-up">
                Sign up
              </Button>
            </Group>
          </div>
        </Container>
      </header>
      <main className="p-md">
        <Outlet />
      </main>
      <footer className="border-t border-gray-100 pt-8">
        <Container size="xl" style={{ textAlign: 'center' }}>
          <Text size="lg">
            Made with{' '}
            <span className="text-red-500" role="img" aria-label="love emoji">
              ❤️
            </span>{' '}
            in Bangladesh
          </Text>
          <Text mt="sm" c="dimmed" size="sm">
            &copy; Copyright Naimul Haque {new Date().getFullYear()}. All Rights
            Reserved.
          </Text>
        </Container>
      </footer>
    </div>
  );
}
