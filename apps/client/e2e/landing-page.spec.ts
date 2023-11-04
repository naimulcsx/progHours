import { expect, test } from "@playwright/test";

test("has page title", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  expect(await page.title()).toBe("progHours - Code. Compete. Conquer!");
});

test("has navigation links", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  const headerLinks = await page.locator(".headerLink").all();

  const headerLinksText = await Promise.all(
    headerLinks.map(async (link) => link.innerText())
  );

  expect(headerLinks.length).toBe(3);
  expect(headerLinksText).toEqual(["Home", "Leaderboard", "Github"]);
});
