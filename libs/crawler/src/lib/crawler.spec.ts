import { crawler } from "./crawler";

describe("crawler", () => {
  it("should work", () => {
    expect(crawler()).toEqual("crawler");
  });
});
