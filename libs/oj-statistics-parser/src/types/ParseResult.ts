import { Verdict } from "@prisma/client";

export type CodeforcesParseResult = {
  judge: "CODEFORCES";
  totalSolved: number;
  solvedProblems: Array<{
    id: number;
    pid: string;
    name: string;
    url: string;
    contestId: number;
    difficulty: number;
    tags: string[];
    solvedAt: Date;
  }>;
  submissions: Array<{
    id: number;
    pid: string;
    name: string;
    url: string;
    contestId: number;
    difficulty: number;
    tags: string[];
    createdAt: Date;
    verdict: Verdict;
  }>;
};

export type OtherParseResult = {
  judge: "OTHER";
  totalSolved: number;
  solvedProblems: Array<{
    pid: string;
    url: string;
    solvedAt: Date;
  }>;
};

export type ParseResult = OtherParseResult | CodeforcesParseResult;
