import { Suspense } from "react";

import { Button, Title } from "@mantine/core";

import { Header } from "../../libs/ui";
import { UsersList } from "./users-list";

export default async function Leaderboard() {
  return (
    <div>
      <Header />
      <Title order={2}>Leaderboard</Title>
      <Button>Hello</Button>
      <Suspense fallback="Loading">
        <UsersList />
      </Suspense>
    </div>
  );
}
