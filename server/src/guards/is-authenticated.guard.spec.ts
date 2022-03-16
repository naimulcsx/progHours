import { IsAuthenticatedGuard } from "./is-authenticated"

describe("AuthGuard", () => {
  it("should be defined", () => {
    expect(new IsAuthenticatedGuard()).toBeDefined()
  })
})
