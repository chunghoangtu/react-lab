import { expect, test } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3006/login");
  });

  test("should have correct metadata and element", async ({ page }) => {
    await expect(page).toHaveTitle("react-firebase-chatapp");

    await expect(page.getByRole("heading", { name: "Fun Chat" })).toBeVisible();
    await expect(await page.getByTestId("login-title").textContent()).toBe("Fun Chat");
  });

  test("should navigate to google page when click go to google button", async ({ page }) => {
    await page.getByRole("button", { name: /Go To Google/i }).click();

    await expect(page).toHaveTitle("Google");
  });

  test("should have functionality login form", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByTestId("login-submit")).toBeVisible();
    await expect(page.getByTestId("login-google")).toBeVisible();
    await expect(page.getByTestId("login-facebook")).toBeVisible();
  });

  test("should be able to fill in login form and submit", async ({ page }) => {
    const loginUsername = page.getByTestId("login-username");
    const loginPassword = page.getByTestId("login-password");
    const loginSubmit = page.getByTestId("login-submit");

    await expect(loginUsername).toBeEmpty();
    await expect(loginPassword).toBeEmpty();

    let logs: string = "";
    page.on("console", (msg) => {
      logs = msg.text();
    });

    await loginSubmit.click();
    await expect(logs).toBe("Failed: Please input your username!");

    await loginUsername.fill("user1");
    await loginSubmit.click();
    await expect(logs).toBe("Failed: Please input your password!");

    await loginPassword.fill("password1");
    await loginSubmit.click();
    await expect(logs).toBe("Success: user1");
  });
});
