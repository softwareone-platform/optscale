import {test} from "../fixtures/page-fixture";
import {expect, request} from "@playwright/test";
import {generateRandomEmail} from "../utils/random-data";
import {AuthRequest} from "../api-requests/auth-request";

const verificationCode = "123456";
let invitationEmail: string;
let inviteLink: string;
let emailVerificationLink: string;


test.describe.only("MPT-8230 Invitation Flow Tests for new users @invitation-flow @ui", () => {


    test.beforeEach('Login admin user', async ({loginPage, header}) => {

        invitationEmail = generateRandomEmail();
        inviteLink = `${process.env.BASE_URL}/invited?email=${encodeURIComponent(invitationEmail)}`;
        emailVerificationLink = `${process.env.BASE_URL}/email-verification?email=${encodeURIComponent(invitationEmail)}&code=${verificationCode}`;

        await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    });

    test("[229865] Invite new user to organisation, user accepts", async ({
                                                                              header,
                                                                              mainMenu,
                                                                              usersPage,
                                                                              usersInvitePage,
                                                                              registerPage,
                                                                              pendingInvitationsPage
                                                                          }) => {
        test.slow();
        const requestContext = await request.newContext();
        const authRequest = new AuthRequest(requestContext);

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

        await test.step("Set verification code", async () => {
            await header.page.waitForTimeout(60000); // Wait for 1 minute for set verification code timeout
            await authRequest.setVerificationCode(invitationEmail, verificationCode);
        });

        await test.step("Verify and accept invitation from email", async () => {
            await pendingInvitationsPage.page.goto(emailVerificationLink);
            await pendingInvitationsPage.acceptInviteFlow();
        });

        await test.step("Assert organization", async () => {
            await expect(header.organizationSelect).toContainText("QA Test Organization");
        });
    });

    test("[229866] Invite new user to organisation, but user declines", async ({
                                                                                   header,
                                                                                   mainMenu,
                                                                                   usersPage,
                                                                                   usersInvitePage,
                                                                                   registerPage,
                                                                                   pendingInvitationsPage
                                                                               }) => {
        test.slow();
        const requestContext = await request.newContext();
        const authRequest = new AuthRequest(requestContext);

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

        await test.step("Set verification code", async () => {
            await header.page.waitForTimeout(61000); // Wait for 1 minute for set verification code timeout
            await authRequest.setVerificationCode(invitationEmail, verificationCode);
        });

        await test.step("Verify and decline invitation from email", async () => {
            await pendingInvitationsPage.page.goto(emailVerificationLink);
            await pendingInvitationsPage.declineInviteFlow();
        });

        await test.step("Assert no pending invitations message", async () => {
            await expect(pendingInvitationsPage.noPendingInvitationsMessage).toBeVisible();
        });
    });

    test("[229867] Invite new user to organisation, who has previously declined @slow", async ({
                                                                                                        header,
                                                                                                        loginPage,
                                                                                                        mainMenu,
                                                                                                        usersPage,
                                                                                                        usersInvitePage,
                                                                                                        registerPage,
                                                                                                        pendingInvitationsPage
                                                                                                    }) => {
        test.slow();
        const requestContext = await request.newContext();
        const authRequest = new AuthRequest(requestContext);

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

        await test.step("Set verification code", async () => {
            await header.page.waitForTimeout(61000); // Wait for 1 minute for set verification code timeout
            await authRequest.setVerificationCode(invitationEmail, verificationCode);
        });

        await test.step("Verify and decline invitation from email", async () => {
            await pendingInvitationsPage.page.goto(emailVerificationLink);
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

        await test.step("Login as new user", async () => {
            await registerPage.navigateToRegistration(inviteLink);
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

    test.beforeEach('Login admin user', async ({loginPage, context, header}) => {
        invitationEmail = generateRandomEmail();
        inviteLink = `https://cloudspend.velasuci.com/invited?email=${encodeURIComponent(invitationEmail)}`;
        emailVerificationLink = `${process.env.BASE_URL}/email-verification?email=${encodeURIComponent(invitationEmail)}&code=${verificationCode}`;

        await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    });

    test("[229868] Invitation is visible in Settings Tab @slow", async ({
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
        const requestContext = await request.newContext();
        const authRequest = new AuthRequest(requestContext);

        await test.step("Verify no pending invitations in Settings tab", async () => {
            await mainMenu.clickSettings();
            await settingsPage.clickInvitationsTab();
            await expect(settingsPage.page.getByText("No invitations pending")).toBeVisible();
        });

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

        await test.step("Set verification code", async () => {
            await header.page.waitForTimeout(61000); // Wait for 1 minute for set verification code timeout
            await authRequest.setVerificationCode(invitationEmail, verificationCode);
        });

        await test.step("Verify and accept invitation from email", async () => {
            await pendingInvitationsPage.page.goto(emailVerificationLink);
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

test.describe.only("MPT-8231 Invitation Flow Tests for an existing user @invitation-flow @ui", () => {


    test.beforeEach('Login admin user', async ({loginPage, context, header}) => {
        invitationEmail = generateRandomEmail();
        inviteLink = `https://cloudspend.velasuci.com/invited?email=${encodeURIComponent(invitationEmail)}`;
        emailVerificationLink = `${process.env.BASE_URL}/email-verification?email=${encodeURIComponent(invitationEmail)}&code=${verificationCode}`;

        await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    });

    test("[229869] Invite existing user with a new role @slow", async ({
                                                                           header,
                                                                           loginPage,
                                                                           mainMenu,
                                                                           usersPage,
                                                                           usersInvitePage,
                                                                           registerPage,
                                                                           settingsPage,
                                                                           pendingInvitationsPage
                                                                       }) => {
        test.slow();
        const requestContext = await request.newContext();
        const authRequest = new AuthRequest(requestContext);

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

        await test.step("Set verification code", async () => {
            await header.page.waitForTimeout(61000); // Wait for 1 minute for set verification code timeout
            await authRequest.setVerificationCode(invitationEmail, verificationCode);
        });

        await test.step("Verify and accept invitation from email", async () => {
            await pendingInvitationsPage.page.goto(emailVerificationLink);
            await pendingInvitationsPage.acceptInviteFlow();
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
            await usersInvitePage.inviteUser(invitationEmail, 'Organization manager');
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
            await expect(settingsPage.page.getByText('● Manager of QA Test Organization organization')).toBeVisible();
        });
    });
});
