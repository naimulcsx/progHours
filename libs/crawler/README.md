## @proghours/crawler

`@proghours/crawler` is a library designed to extract information from programming problems available on various online judges. It pulls data, such as problem `name`, `problem_id`, `contest_id`, `tag`, `difficulty` etc, by fetching the information from the given problem URL. It can also fetch user submissions from supported online judges.

In cases where an API is not available, `@proghours/crawler` utilizes web crawling techniques to gather the necessary data. By integrating `@proghours/crawler` with `progHours`, we are able to easily extract the necessary data we needed for the system.

The library currently supports 14 different online judges.

1. [Codeforces](https://codeforces.com)
2. [CodeChef](https://www.codechef.com)
3. [CSES](https://cses.fi)
4. [Online Judge](https://onlinejudge.org)
5. [Toph](https://toph.co)
6. [SPOJ](https://www.spoj.com)
7. [HackerRank](https://www.hackerrank.com)
8. [LightOJ](http://lightoj.com)
9. [AtCoder](https://atcoder.jp)
10. [EOlymp](https://www.eolymp.com)
11. [LeetCode](https://leetcode.com)
12. [Timus Online Judge](http://acm.timus.ru)
13. [CodeToWin](https://codeto.win)
14. [Kattis](https://open.kattis.com)

### Test Coverage

We have 100% test coverage for the `oj-problem-parser` library, ensuring the accuracy and reliability of the code. Note that, the tests could break if the 3rd party APIs or web pages changes.

Each online judge is covered by individual test files. For example, the `codeforces.spec.ts` file contains test cases specifically designed for the Codeforces online judge. Similarly, we have `.spec.ts` files for all other online judges.

#### Running All Tests

To run all the tests project, you can execute the following command:

```bash
nx run crawler:test
```

#### Running Individual Test Files

If you wish to run tests for a specific online judge, you can use the following command:

```bash
nx run crawler:test --testFile=libs/oj-problem-parser/src/tests/codeforces.spec.ts
```

Simply replace `codeforces.spec.ts` with the desired test file for the corresponding online judge. This command will execute the specified test file and provide the results.

By running the tests, you can ensure that the `@proghours/crwaler` library functions as expected and handles various scenarios encountered on different online judges effectively.
