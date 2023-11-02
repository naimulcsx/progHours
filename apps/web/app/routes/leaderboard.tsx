import { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => ({
  title: "Leaderboard - progHours"
});

export default function LeaderboardPage() {
  return <div>Leaderboard</div>;
}
