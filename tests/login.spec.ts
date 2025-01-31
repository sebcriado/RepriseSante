import { test, expect } from '@playwright/test';

test.describe("Login Page", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("http://localhost:5173/login")
    });

    test("Should always have the elements", async({page}) => {
        await expect(
            page.getByRole("heading", {
                name: "Connexion"
            })
        ).toBeVisible();

        await expect(
            page.getByLabel("Email")
        ).toBeVisible();

        await expect(
            page.getByLabel("Mot de passe")
        ).toBeVisible();

        await expect(
            page.getByRole("button", {
                name: "Se connecter"
            })
        ).toBeVisible();
    })
})
