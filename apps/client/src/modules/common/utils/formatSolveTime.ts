export function formatSolveTime(solveTime: number) {
  const h = Math.floor(solveTime / 60);
  const m = solveTime % 60;
  return `${h}h ${m}m`;
}
