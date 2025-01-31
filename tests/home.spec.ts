import { test, expect } from '@playwright/test';

test.describe("Home Page", () => {
    test.beforeEach(async ({page}) => {
        await page.goto("http://localhost:5173")
    });

    test("Should always have the elements and metadata", async({page}) => {
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

    test("Should redirect to login page on click", async ({page}) => {
        await page.getByRole("link", {
            name: "Connexion"
        }).click();

        await expect(page).toHaveURL("http://localhost:5173/login");
    })

    test("Should redirect to register page on click", async ({page}) => {
        await page.getByRole("link", {
            name: "Inscription"
        }).click();

        await expect(page).toHaveURL("http://localhost:5173/register");
    })
})
