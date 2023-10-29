import { Suspense } from "react";

import { UsersList } from "./users-list";

export default async function Leaderboard() {
  return (
    <div>
      <h2>Leaderboard</h2>
      <Suspense fallback="Loading">
        <UsersList />
      </Suspense>
    </div>
  );
}
