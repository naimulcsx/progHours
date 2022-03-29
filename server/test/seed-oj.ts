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

const judges = [
  "CodeForces", // 1
  "CodeChef", // 2
  "CSES", // 3
  "UVa", // 4
  "Toph", // 5
  "SPOJ", // 6
  "Hackerrank", // 7
]

async function createOnlineJudges() {
  for (let i = 1; i <= judges.length; i++) {
    await client.query("INSERT INTO online_judges(id, name) VALUES($1, $2)", [
      i,
      judges[i - 1],
    ])
  }
}

async function seed() {
  await client.query("DELETE FROM online_judges")
  await createOnlineJudges()
  client.end()
}

seed()
