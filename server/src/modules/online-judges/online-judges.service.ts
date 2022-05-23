import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { OnlineJudge } from "./online-judge.entity"

@Injectable()
export class OnlineJudgesService {
  constructor(
    @InjectRepository(OnlineJudge)
    private onlineJudgesReponsitory: Repository<OnlineJudge>
  ) {}

  async seed() {
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
    const onlineJudges = this.onlineJudgesReponsitory.create(judges)
    return this.onlineJudgesReponsitory.save(onlineJudges)
  }
}
