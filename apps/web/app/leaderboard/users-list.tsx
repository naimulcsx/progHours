"use client";

import { client } from "@proghours/data-access";

export function UsersList() {
  const { data } = client.leaderboard.getAll.useSuspenseQuery({ type: "full" });
  return (
    <ul>
      {data.map((el) => {
        return (
          <li key={el.id}>
            {el.fullName} - {el.totalSolved}
          </li>
        );
      })}
    </ul>
  );
}
