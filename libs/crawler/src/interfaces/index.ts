export interface ProblemData {
  pid: string;
  name: string;
  url: string;
  tags: string[];
  difficulty: number;
}

export type Verdict =
  | "AC"
  | "PS"
  | "WA"
  | "TLE"
  | "MLE"
  | "RE"
  | "CE"
  | "SK"
  | "OTH"
  | "HCK";
