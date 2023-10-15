import { CodeChefParseResult } from "../parsers/codechef.parser";
import { CodeforcesParseResult } from "../parsers/codeforces.parser";

export type ParseResult = CodeChefParseResult | CodeforcesParseResult;
