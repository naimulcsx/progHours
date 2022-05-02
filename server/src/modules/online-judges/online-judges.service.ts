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
      { id: 1, name: "CodeForces" },
      { id: 2, name: "CodeChef" },
      { id: 3, name: "CSES" },
      { id: 4, name: "UVa" },
      { id: 5, name: "Toph" },
      { id: 6, name: "SPOJ" },
      { id: 7, name: "Hackerrank" },
      { id: 8, name: "LightOJ" },
      { id: 9, name: "AtCoder" },
      { id: 10, name: "EOlymp" },
      { id: 11, name: "BeeCrowd" },
      { id: 12, name: "LeetCode" },
      { id: 13, name: "Timus" },
      { id: 14, name: "CodeToWin" },
      { id: 15, name: "ICPC Live Archive" },
    ]
    const onlineJudges = this.onlineJudgesReponsitory.create(judges)
    return this.onlineJudgesReponsitory.save(onlineJudges)
  }
}
