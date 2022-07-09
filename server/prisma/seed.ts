import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const judges = [
  { id: 1, name: "Codeforces" },
  { id: 2, name: "CodeChef" },
  { id: 3, name: "CSES" },
  { id: 4, name: "UVA" },
  { id: 5, name: "Toph" },
  { id: 6, name: "SPOJ" },
  { id: 7, name: "HackerRank" },
  { id: 8, name: "LightOJ" },
  { id: 9, name: "AtCoder" },
  { id: 10, name: "Eolymp" },
  { id: 11, name: "Beecrowd" },
  { id: 12, name: "LeetCode" },
  { id: 13, name: "Timus" },
  { id: 14, name: "CodeToWin" },
  { id: 15, name: "UVALive" },
  { id: 16, name: "HackerEarth" },
  { id: 17, name: "Kattis" },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const oj of judges) {
    const user = await prisma.onlineJudge.create({
      data: oj,
    })
    console.log(`Created OJ with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
