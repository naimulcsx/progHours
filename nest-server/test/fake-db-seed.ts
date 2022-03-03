const { faker } = require('@faker-js/faker');
const { Client } = require('pg');

const client = new Client({
  user: 'user',
  password: 'pass',
  host: 'db_server',
  database: 'app',
  port: 5432,
});

client.connect();

const NUMBER_OF_USERS = 500;
const NUMBER_OF_PROBLEMS = 2000;
const AVG_SUBS_PER_USER = 200;
const NUMBER_OF_SUBS = AVG_SUBS_PER_USER * NUMBER_OF_USERS;

async function createUsers() {
  // delete all the records from users

  const prevObj = {};
  function generateId() {
    let id = 'C' + Math.floor(100000 + Math.random() * 900000);
    while (prevObj[id]) {
      id = 'C' + Math.floor(100000 + Math.random() * 900000);
    }
    prevObj[id] = 1;
    return id;
  }

  // generate 100 fake users
  for (let i = 1; i <= NUMBER_OF_USERS; ++i) {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const role = 'user';
    const username = generateId();
    const password =
      '$2b$10$3auvUdpAn/Z.xEnmJFzas.RhLCDJLLW24kj/yPLFnfUpigSDVv/rS';

    await client.query(
      'INSERT INTO users(id, name, email, username, role, password) VALUES($1, $2, $3, $4, $5, $6)',
      [i, name, email, username, role, password],
    );
  }
}

async function createProblems() {
  // generate 2000 problems
  for (let i = 1; i <= NUMBER_OF_PROBLEMS; ++i) {
    // id, pid, name, link, difficulty
    const pid = faker.random.alphaNumeric(10); // unique
    const name = faker.hacker.verb() + ' the ' + faker.hacker.noun();
    const link = faker.internet.url(); // unique
    const difficulty = Math.floor(Math.random() * 30) * 100;
    await client.query(
      'INSERT INTO problems(id, pid, name, link, difficulty) VALUES($1, $2, $3, $4, $5)',
      [i, pid, name, link, difficulty],
    );
  }
}

async function createSubmissions() {
  for (let i = 1; i <= NUMBER_OF_SUBS; ++i) {
    const verdicts = ['AC', 'TLE', 'WA', 'RTE'];
    const user_id = Math.floor(Math.random() * NUMBER_OF_USERS) + 1;
    const problem_id = Math.floor(Math.random() * NUMBER_OF_PROBLEMS) + 1;
    const verdict = faker.random.arrayElement(verdicts);
    const solve_time = Math.floor(Math.random() * 100) + 1;
    const solved_at = faker.datatype.datetime({
      max: 1644861600000,
      min: 1630432800000,
    });
    try {
      await client.query(
        'INSERT INTO submissions(id, solve_time, solved_at, verdict, problem_id, user_id) VALUES($1, $2, $3, $4, $5, $6)',
        [i, solve_time, solved_at, verdict, problem_id, user_id],
      );
    } catch (err) {
      console.log(err);
    }
  }
}

async function seed() {
  // delete current data
  await client.query('DELETE from submissions');
  await client.query('DELETE FROM users');
  await client.query('DELETE FROM problems');

  // ajudst sequence id
  await client.query('ALTER SEQUENCE problems_id_seq RESTART WITH 20000');
  await client.query('ALTER SEQUENCE submissions_id_seq RESTART WITH 200000');

  // insert new data
  await createUsers();
  await createProblems();
  await createSubmissions();
  client.end();
}

seed();
