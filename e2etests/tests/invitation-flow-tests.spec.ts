import {test} from "../fixtures/page-fixture";
import {expect, Page} from "@playwright/test";
import {generateRandomEmail} from "../utils/random-data";
import {MailpitPage} from "../pages/mailpit-page";

test.describe.only("MPT-8230 Invitation Flow Tests for new users @invitation-flow @ui", () => {
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

    test("Invite new user to organisation, user accepts", async ({
                                                                     header,
                                                                     mainMenu,
                                                                     usersPage,
                                                                     usersInvitePage,
                                                                     registerPage,
                                                                     pendingInvitationsPage
                                                                 }) => {
        await test.step("Navigate to the invitation page", async () => {
            await mainMenu.clickUserManagement();
            await usersPage.clickInviteBtn();
        });

        await test.step("Invite a new user to the organisation", async () => {
            await usersInvitePage.inviteUser(invitationEmail);
            await usersInvitePage.userInvitedAlert.waitFor();
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
            await pendingInvitationsPage.page.goto(verifyUrl);
            await pendingInvitationsPage.page.bringToFront();
            await pendingInvitationsPage.acceptInviteFlow();
        });

        await test.step("Assert organization", async () => {
            await expect(header.organizationSelect).toContainText("QA Test Organization");
        });
    });

    test("Invite new user to organisation, but user declines", async ({
                                                                          header,
                                                                          mainMenu,
                                                                          usersPage,
                                                                          usersInvitePage,
                                                                          registerPage,
                                                                          pendingInvitationsPage
                                                                      }) => {
        await test.step("Navigate to the invitation page", async () => {
            await mainMenu.clickUserManagement();
            await usersPage.clickInviteBtn();
        });

        await test.step("Invite a new user to the organisation", async () => {
            await usersInvitePage.inviteUser(invitationEmail);
            await usersInvitePage.userInvitedAlert.waitFor();
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
        await test.step("Verify and decline invitation from email", async () => {
            await pendingInvitationsPage.page.goto(verifyUrl);
            await pendingInvitationsPage.page.bringToFront();
            await pendingInvitationsPage.declineInviteFlow();
        });

        await test.step("Assert no pending invitations message", async () => {
            await expect(pendingInvitationsPage.noPendingInvitationsMessage).toBeVisible();
        });
    });

    test("Invite new user to organisation, who has previously declined", async ({
                                                                                    header,
                                                                                    loginPage,
                                                                                    mainMenu,
                                                                                    usersPage,
                                                                                    usersInvitePage,
                                                                                    registerPage,
                                                                                    pendingInvitationsPage
                                                                                }) => {
        test.slow();
        await test.step("Navigate to the invitation page", async () => {
            await mainMenu.clickUserManagement();
            await usersPage.clickInviteBtn();
        });

        await test.step("Invite a new user to the organisation", async () => {
            await usersInvitePage.inviteUser(invitationEmail);
            await usersInvitePage.userInvitedAlert.waitFor();
        });

        await test.step("Sign out Admin user", async () => {
            await header.signOut();
        });

        await test.step("Sign up user", async () => {
            await registerPage.navigateToRegistration(inviteLink);
            await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
        });

        await test.step("Verify email", async () => {
            await mailpitPage.loginToMailpit(process.env.MAILPIT_USER, process.env.MAILPIT_SECRET);
            await mailpitPage.page.bringToFront();
            verifyUrl = await mailpitPage.getVerificationLink(invitationEmail);
        });
        await test.step("Verify and decline invitation from email", async () => {
            await pendingInvitationsPage.page.goto(verifyUrl);
            await pendingInvitationsPage.page.bringToFront();
            await pendingInvitationsPage.declineInviteFlow();
        });

        await test.step("Assert no pending invitations message", async () => {
            await expect(pendingInvitationsPage.noPendingInvitationsMessage).toBeVisible();
        });

        await test.step("Sign out user", async () => {
            await header.signOut();
        })

        await test.step("Log back in as admin", async () => {
            await loginPage.loginWithoutNavigation(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
        })
        await test.step("Navigate to the invitation page", async () => {
            await mainMenu.clickUserManagement();
            await usersPage.clickInviteBtn();
        });

        await test.step("Invite a new user to the organisation", async () => {
            await usersInvitePage.inviteUser(invitationEmail);
            await usersInvitePage.userInvitedAlert.waitFor();
        });

        await test.step("Sign out Admin user", async () => {
            await header.signOut();
        });

        await test.step("View invitation email in mailpit", async () => {
            await mailpitPage.loginToMailpit(process.env.MAILPIT_USER, process.env.MAILPIT_SECRET);
            await mailpitPage.page.bringToFront();
            await mailpitPage.clickInvitationEmail(invitationEmail);
            await expect(await mailpitPage.getInviteLink(inviteLink)).toBeVisible();
        });

        await test.step("Login as new user", async () => {
            await registerPage.navigateToRegistration(inviteLink);
            await registerPage.page.bringToFront();
            await registerPage.clickAlreadyHaveAccountLink();
            await loginPage.loginWithPreFilledEmail(process.env.Default_USER_PASSWORD);
        });

        await test.step("Accept invitation", async () => {
            await pendingInvitationsPage.clickAcceptBtn();
        });

        await test.step("Assert organization", async () => {
            await expect(header.organizationSelect).toContainText("QA Test Organization");
        });

    });
});

test.describe.only("MPT-8229 Validate invitations in the settings @invitation-flow @ui", () => {
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

    test("Invitation is visible in Settings Tab", async ({
                                                                          loginPage,
                                                                          header,
                                                                          mainMenu,
                                                                          usersPage,
                                                                          usersInvitePage,
                                                                          registerPage,
                                                                          settingsPage,
                                                                          pendingInvitationsPage
                                                                      }) => {
        test.slow();

        await test.step("Navigate to the invitation page", async () => {
            await mainMenu.clickUserManagement();
            await usersPage.clickInviteBtn();
        });

        await test.step("Invite a new user to the organisation", async () => {
            await usersInvitePage.inviteUser(invitationEmail);
            await usersInvitePage.userInvitedAlert.waitFor();
        });

        await test.step("Sign out Admin user", async () => {
            await header.signOut();
        });

        await test.step("Sign up user", async () => {
            await registerPage.navigateToRegistration(inviteLink);
            await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
        });

        await test.step("Verify email", async () => {
            await mailpitPage.page.bringToFront();
            await mailpitPage.loginToMailpit(process.env.MAILPIT_USER, process.env.MAILPIT_SECRET);

            verifyUrl = await mailpitPage.getVerificationLink(invitationEmail);
        });

        await test.step("Verify and accept invitation from email", async () => {
            await pendingInvitationsPage.page.goto(verifyUrl);
            await pendingInvitationsPage.page.bringToFront();
            await pendingInvitationsPage.acceptInviteFlow();
        });

        await test.step("Verify no pending invitations in Settings tab", async () => {
            await mainMenu.clickSettings();
            await settingsPage.clickInvitationsTab();
            await expect(settingsPage.page.getByText("No invitations pending")).toBeVisible();
        });

        await test.step("Sign out user", async () => {
            await header.signOut();
        })

        await test.step("Log back in as admin", async () => {
            await loginPage.loginWithoutNavigation(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
        })
        await test.step("Navigate to the invitation page", async () => {
            await mainMenu.clickUserManagement();
            await usersPage.clickInviteBtn();
        });

        await test.step("Invite a existing user to the organisation", async () => {
            await usersInvitePage.inviteUser(invitationEmail, 'Engineer', 'QA Test Organization');
            await usersInvitePage.userInvitedAlert.waitFor();
        });

        await test.step("Sign out Admin user", async () => {
            await header.signOut();
        });

        await test.step("Login as new user", async () => {
            await loginPage.loginWithoutNavigation(invitationEmail, process.env.DEFAULT_USER_PASSWORD);
        });

        await test.step("View invitation in Settings", async () => {
            await settingsPage.navigateToURL(true);
            await settingsPage.clickInvitationsTab();
            await expect(settingsPage.page.getByText('● Engineer at QA Test Organization pool')).toBeVisible();
        });
    });
});