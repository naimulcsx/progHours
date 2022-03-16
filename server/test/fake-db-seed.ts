const { faker } = require("@faker-js/faker")
const { Client } = require("pg")

const client = new Client({
  user: "user",
  password: "pass",
  host: "db_server",
  database: "app",
  port: 5432,
})

client.connect()

const NUMBER_OF_USERS = 10
const NUMBER_OF_PROBLEMS = 1000
const AVG_SUBS_PER_USER = 1000
const NUMBER_OF_TAGS = 100
const AVG_TAGS_PER_PROBLEM = 5
const NUMBER_OF_SUBS = AVG_SUBS_PER_USER * NUMBER_OF_USERS

async function createUsers() {
  // delete all the records from users

  const prevObj = {}
  function generateId() {
    let id = "C" + Math.floor(100000 + Math.random() * 900000)
    while (prevObj[id]) {
      id = "C" + Math.floor(100000 + Math.random() * 900000)
    }
    prevObj[id] = 1
    return id
  }

  // generate 100 fake users
  for (let i = 1; i <= NUMBER_OF_USERS; ++i) {
    const name = faker.name.findName()
    const email = faker.internet.email()
    const role = "user"
    const username = generateId()
    const password =
      "$2b$10$3auvUdpAn/Z.xEnmJFzas.RhLCDJLLW24kj/yPLFnfUpigSDVv/rS"

    await client.query(
      "INSERT INTO users(id, name, email, username, role, password) VALUES($1, $2, $3, $4, $5, $6)",
      [i, name, email, username, role, password]
    )
  }
}

function randomInRange(start, end) {
  return Math.floor(Math.random() * (end - start + 1) + start)
}

async function createProblems() {
  // generate 2000 problems
  for (let i = 1; i <= NUMBER_OF_PROBLEMS; ++i) {
    const arr = ["CF-", "SPOJ-", "CC-", "TH-", "AC-"]
    // id, pid, name, link, difficulty
    const pid =
      arr[Math.floor(Math.random() * arr.length)] +
      faker.random.alphaNumeric(10) // unique
    const name = faker.hacker.verb() + " the " + faker.hacker.noun()
    const link = faker.internet.url() // unique
    const difficulty = randomInRange(8, 18) * 100
    await client.query(
      "INSERT INTO problems(id, pid, name, link, difficulty) VALUES($1, $2, $3, $4, $5)",
      [i, pid, name, link, difficulty]
    )
  }
}

async function createSubmissions() {
  for (let i = 1; i <= NUMBER_OF_SUBS; ++i) {
    const verdicts = [
      "AC",
      "AC",
      "AC",
      "AC",
      "TLE",
      "AC",
      "WA",
      "AC",
      "AC",
      "AC",
      "AC",
      "RTE",
    ]
    const user_id = Math.floor(Math.random() * NUMBER_OF_USERS) + 1
    const problem_id = Math.floor(Math.random() * NUMBER_OF_PROBLEMS) + 1
    const verdict = faker.random.arrayElement(verdicts)
    const solve_time = Math.floor(Math.random() * 100) + 1
    const solved_at = faker.datatype.datetime({
      max: 1646469214282,
      min: 1630432800000,
    })
    try {
      await client.query(
        "INSERT INTO submissions(id, solve_time, solved_at, verdict, problem_id, user_id) VALUES($1, $2, $3, $4, $5, $6)",
        [i, solve_time, solved_at, verdict, problem_id, user_id]
      )
    } catch (err) {}
  }
}

async function createTags() {
  for (let i = 1; i <= NUMBER_OF_TAGS; ++i) {
    await client.query("INSERT INTO tags(id, name) VALUES($1, $2)", [
      i,
      "tag-" + i,
    ])
  }

  for (let i = 1; i <= NUMBER_OF_PROBLEMS; ++i) {
    for (let j = 1; j <= AVG_TAGS_PER_PROBLEM; ++j) {
      try {
        await client.query(
          "INSERT INTO problem_tags  (problem_id, tag_id) VALUES($1, $2)",
          [i, Math.floor(Math.random() * NUMBER_OF_TAGS) + 1]
        )
      } catch (err) {}
    }
  }

  for (let i = 1; i <= NUMBER_OF_PROBLEMS; ++i) {
    for (let j = 1; j <= AVG_TAGS_PER_PROBLEM; ++j) {
      try {
        await client.query(
          "INSERT INTO user_problem_tags(id, user_id, problem_id, tag_id) VALUES($1, $2, $3, $4)",
          [
            i * j,
            Math.floor(Math.random() * NUMBER_OF_USERS) + 1,
            Math.floor(Math.random() * NUMBER_OF_PROBLEMS) + 1,
            Math.floor(Math.random() * NUMBER_OF_TAGS) + 1,
          ]
        )
      } catch (err) {}
    }
  }
}

async function seed() {
  // delete current data
  await client.query("DELETE FROM user_problem_tags")
  await client.query("DELETE from submissions")
  await client.query("DELETE FROM users")
  await client.query("DELETE FROM problems")
  await client.query("DELETE FROM tags")

  // ajudst sequence id
  await client.query("ALTER SEQUENCE problems_id_seq RESTART WITH 20000")
  await client.query("ALTER SEQUENCE submissions_id_seq RESTART WITH 200000")
  await client.query("ALTER SEQUENCE users_id_seq RESTART WITH 2000")
  await client.query("ALTER SEQUENCE tags_id_seq RESTART WITH 300")
  await client.query(
    "ALTER SEQUENCE user_problem_tags_id_seq RESTART WITH 100000"
  )

  // insert new data
  await createUsers()
  await createProblems()
  await createSubmissions()
  await createTags()
  client.end()
}

seed()
