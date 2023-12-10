import { ReactNode } from "react";

export type Analytics =
  | "weeklyInsights"
  | "topSolvedTags"
  | "timeDistribution"
  | "averageDifficultyAnalysis";

export type FAQItem = {
  value: string;
  description: string;
};

export type FeatureItem = {
  icon: ReactNode;
  title: ReactNode[];
  description: string;
};
