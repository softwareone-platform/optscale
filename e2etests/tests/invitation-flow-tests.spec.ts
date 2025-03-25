import {test} from "../fixtures/page-fixture";
import {expect, Page} from "@playwright/test";
import {generateRandomEmail} from "../utils/random-data";
import {MailpitPage} from "../pages/mailpit-page";

test.describe.only("MPT-8230 Invitation Flow Tests @invitation-flow", () => {
    let invitationEmail: string;
    let inviteLink: string;
    let mailpitPage: MailpitPage;
    let verifyUrl: string;

    test.beforeEach('Login admin user', async ({loginPage, context}) => {
        invitationEmail = generateRandomEmail();
        inviteLink = `https://cloudspend.velasuci.com/invited?email=${encodeURIComponent(invitationEmail)}`;

        const mailpitTab = await context.newPage();
        mailpitPage = new MailpitPage(mailpitTab);
        await loginPage.page.bringToFront();
        await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    });

    test("Invite new user to organisation", async ({header, mainMenu, usersPage, usersInvitePage, registerPage, pendingInvitationPage}) => {
        await test.step("Navigate to the invitation page", async () => {
            await mainMenu.clickUserManagement();
            await usersPage.clickInviteBtn();
        });

        await test.step("Invite a new user to the organisation", async () => {

            await usersInvitePage.inviteUser(invitationEmail);
            await usersInvitePage.userInvitedAlert.waitFor();
            // await expect(usersInvitePage.userInvitedAlert).toBeVisible();
        });

        await test.step("Sign out Admin user", async () => {
            await header.signOut();
        });

        await test.step("View invitation email in mailpit", async () => {
            await mailpitPage.page.bringToFront();
            await mailpitPage.loginToMailpit(process.env.MAILPIT_USER, process.env.MAILPIT_SECRET);
            await mailpitPage.clickInvitationEmail(invitationEmail);
            await expect(await mailpitPage.getInviteLink(inviteLink)).toBeVisible();
        });

        await test.step("Sign up user", async () => {
            await registerPage.page.bringToFront();
            await registerPage.navigateToRegistration(inviteLink);
            await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
        });

        await test.step("Verify email", async () => {
            await mailpitPage.page.bringToFront();
            verifyUrl = await mailpitPage.getVerificationLink(invitationEmail);
        });
        await test.step("Verify and accept invitation from email", async () => {
            await pendingInvitationPage.page.goto(verifyUrl);
            await pendingInvitationPage.page.bringToFront();
            await pendingInvitationPage.acceptInviteFlow();
        });

    });
});