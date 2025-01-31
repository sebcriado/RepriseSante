import { test, expect } from '@playwright/test';

test.describe("Home Page", () => {
    test("Should always have the elements and metadata", async({page}) => {
        await page.goto("http://localhost:5173");

        await expect(page).toHaveTitle("RepriseSanté");

        await expect(
            page.getByRole("heading", {
                name: "Connectons les médecins pour une meilleure continuité des soins"
            })
        ).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: "Connexion"
            })
        ).toBeVisible();

        await expect(
            page.getByRole("link", {
                name: "Inscription"
            })
        ).toBeVisible();
    })
})
