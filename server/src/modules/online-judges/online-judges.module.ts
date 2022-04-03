import { Module } from "@nestjs/common"
const { Client } = require("pg")

async function createOnlineJudges() {
  const client = new Client({
    user: "user",
    password: "pass",
    host: "db_server",
    database: "app",
    port: 5432,
  })
  client.connect()
  const judges = [
    "CodeForces",
    "CodeChef",
    "CSES",
    "UVa",
    "Toph",
    "SPOJ",
    "Hackerrank",
    "LightOJ",
    "AtCoder",
    "EOlymp",
    "BeeCrowd",
    "LeetCode",
  ]
  const result = await client.query("SELECT * FROM online_judges")
  if (result.rows.length === 0) {
    for (let i = 1; i <= judges.length; i++) {
      await client.query("INSERT INTO online_judges(id, name) VALUES($1, $2)", [
        i,
        judges[i - 1],
      ])
    }
  }
  client.end()
}

createOnlineJudges()
@Module({})
export class OnlineJudgesModule {}
