import {test} from "../fixtures/page-fixture";
import {expect, Page} from "@playwright/test";
import {generateRandomEmail} from "../utils/random-data";
import {EmailVerificationPage} from "../pages/email-verification-page";

test.describe.only("MPT-8230 Invitation Flow Tests @invitation-flow", () => {
    let invitationEmail: string
    let inviteLink: string

    test.beforeEach('Login admin user', async ({loginPage}) => {
        invitationEmail = generateRandomEmail();
        inviteLink = `https://cloudspend.velasuci.com/invited?email=${encodeURIComponent(invitationEmail)}`;
        await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    });

    test("Invite new user to organisation", async ({header, mainMenu, usersPage, usersInvitePage, mailpitPage, registerPage}) => {
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

        await test.step("View email in mailpit", async () => {
            await mailpitPage.loginToMailpit(process.env.MAILPIT_USER, process.env.MAILPIT_SECRET);
            await mailpitPage.confirmInvitationEmailReceived(invitationEmail);
        });

        await test.step("Sign up user", async () => {
            await registerPage.navigateToRegistration(inviteLink);
            await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
        });

        await test.step("Verify and accept invitation from email", async () => {
            const popupPage = await mailpitPage.openEmailVerification(invitationEmail);
            const emailVerificationPage = new EmailVerificationPage(popupPage);
            await emailVerificationPage.acceptInviteFlow();
        });
        
    });
});