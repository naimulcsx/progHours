/**
 * Script for migrating data from the production database to the localhost.
 *
 * This Node.js script connects to the production database and the local database,
 * fetches data from the production database, and inserts it into the corresponding
 * tables in the local database. It is intended to synchronize data between the two
 * databases, ensuring that your local development environment reflects the latest
 * production data for testing and debugging purposes.
 *
 * Make sure to configure the database connection settings appropriately and take
 * necessary precautions while running this script to avoid accidental data loss or
 * any undesired modifications to your production or local databases.
 *
 * Author: Naimul Haaque
 * Date: 29th July 2023
 */
import {
  Prisma,
  PrismaClient,
  Problem,
  ProblemTag,
  Role,
  Submission,
  Tag,
  User
} from "@prisma/client";
import { Pool } from "pg";

const pool = new Pool({
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

(async function migrate() {
  const prisma = new PrismaClient(); // db (local)
  const client = await pool.connect(); // db (prod)

  /**
   * Dropping current database (local)
   */
  await prisma.submission.deleteMany({});
  await prisma.problemTag.deleteMany({});
  await prisma.problem.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.userHandle.deleteMany({});
  await prisma.user.deleteMany({});

  /**
   * Migrate users
   */
  const userCreatePromises: Promise<User>[] = [];
  const usersQuery = await client.query(`SELECT * FROM "User"`);

  usersQuery.rows.forEach((user) => {
    let role: Role = "REGULAR";
    if (user.role === "MODERATOR") role = "MENTOR";
    if (user.role === "ADMIN") role = "ADMIN";

    let metaData: any = {};
    if (user.department) metaData.department = user.department;
    if (user.batch) metaData.batch = user.batch;
    if (user.cgpa) metaData.cgpa = user.cgpa;
    if (user.section) metaData.section = user.section;

    const userData = {
      id: user.id,
      fullName: user.name,
      email: user.email,
      username: user.username,
      password: user.password,
      phone: user.mobile,
      createdAt: user.memberSince,
      updatedAt: user.memberSince,
      lastSeen: user.memberSince,
      role,
      metaData
    };
    userCreatePromises.push(
      prisma.user.create({
        data: userData
      })
    );
  });

  // update sequence
  const maxId = usersQuery.rows.reduce(
    (prev, curr) => Math.max(prev, curr.id),
    0
  );
  const usersSeqQuery = `ALTER SEQUENCE users_id_seq RESTART WITH ${maxId + 1}`;
  await prisma.$queryRaw`${Prisma.raw(usersSeqQuery)}`;

  console.time(`users (${usersQuery.rowCount})`);
  await Promise.all(userCreatePromises);
  console.timeEnd(`users (${usersQuery.rowCount})`);

  /**
   * Migrate tags data
   */
  const tagCreatePromises: Promise<Tag>[] = [];
  const tagsQuery = await client.query(`SELECT * FROM "Tag"`);

  tagsQuery.rows.forEach((tag) => {
    tagCreatePromises.push(
      prisma.tag.create({
        data: {
          id: tag.id,
          name: tag.name
        }
      })
    );
  });

  // update sequence
  const tagsMaxId = tagsQuery.rows.reduce(
    (prev, curr) => Math.max(prev, curr.id),
    0
  );
  const tagsSeqQuery = `ALTER SEQUENCE tags_id_seq RESTART WITH ${
    tagsMaxId + 1
  }`;
  await prisma.$queryRaw`${Prisma.raw(tagsSeqQuery)}`;

  console.time(`tags (${tagsQuery.rowCount})`);
  await Promise.all(tagCreatePromises);
  console.timeEnd(`tags (${tagsQuery.rowCount})`);

  /**
   * Migrate problems data
   */
  const problemCreatePromises: Promise<Problem>[] = [];
  const problemsQuery = await client.query(`SELECT * FROM "Problem"`);

  problemsQuery.rows.forEach((problem) => {
    problemCreatePromises.push(
      prisma.problem.create({
        data: {
          id: problem.id,
          pid: problem.pid,
          name: problem.name,
          difficulty: problem.difficulty,
          createdAt: problem.createdAt,
          url: problem.link
        }
      })
    );
  });

  // update sequence
  const problemsMaxId = problemsQuery.rows.reduce(
    (prev, curr) => Math.max(prev, curr.id),
    0
  );
  console.log(problemsMaxId);
  const problemsSeqQuery = `ALTER SEQUENCE problems_id_seq RESTART WITH ${
    problemsMaxId + 1
  }`;
  await prisma.$queryRaw`${Prisma.raw(problemsSeqQuery)}`;

  console.time(`problems (${problemsQuery.rowCount})`);
  await Promise.all(problemCreatePromises);
  console.timeEnd(`problems (${problemsQuery.rowCount})`);

  /**
   * Migrate problem tags data
   */
  const problemTagCreatePromises: Promise<ProblemTag>[] = [];
  const problemTagsQuery = await client.query(`SELECT * FROM "ProblemTag"`);

  problemTagsQuery.rows.forEach((problemTag) => {
    problemTagCreatePromises.push(
      prisma.problemTag.create({
        data: {
          problemId: problemTag.problemId,
          tagId: problemTag.tagId
        }
      })
    );
  });
  console.time(`problem_tags (${problemTagsQuery.rowCount})`);
  await Promise.all(problemTagCreatePromises);
  console.timeEnd(`problem_tags (${problemTagsQuery.rowCount})`);

  /**
   * Migrate submissions data
   */
  const submissionCreatePromises: Promise<Submission>[] = [];
  const submissionsQuery = await client.query(`SELECT * FROM "Submission"`);

  submissionsQuery.rows.forEach((submission) => {
    submissionCreatePromises.push(
      prisma.submission.create({
        data: {
          id: submission.id,
          userId: submission.userId,
          problemId: submission.problemId,
          solveTime: submission.solveTime,
          verdict: submission.verdict,
          solvedAt: submission.solvedAt,
          createdAt: submission.solvedAt
        }
      })
    );
  });

  // update sequence
  const submissionsMaxId = submissionsQuery.rows.reduce(
    (prev, curr) => Math.max(prev, curr.id),
    0
  );
  const submissionsSeqQuery = `ALTER SEQUENCE submissions_id_seq RESTART WITH ${
    submissionsMaxId + 1
  }`;
  await prisma.$queryRaw`${Prisma.raw(submissionsSeqQuery)}`;

  console.time(`submissions (${submissionsQuery.rowCount})`);
  await Promise.all(submissionCreatePromises);
  console.timeEnd(`submissions (${submissionsQuery.rowCount})`);
})();
