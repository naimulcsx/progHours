import axios from "axios";
import { groupBy } from "lodash";

axios
  .get<{
    result: Array<{
      verdict: string;
      problem: { contestId: number; index: string };
    }>;
  }>(
    "https://codeforces.com/api/user.status?handle=naimulcsx&from=1&count=10000"
  )
  .then(({ data }) => {
    const result = groupBy(
      data.result,
      (item) => item.problem.contestId + item.problem.index
    );
    console.log(result);
  });
