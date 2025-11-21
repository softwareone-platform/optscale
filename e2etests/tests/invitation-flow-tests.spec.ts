import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { generateRandomEmail } from '../utils/random-data-generator';

const verificationCode = '123456';
let invitationEmail: string;
let inviteLink: string;

test.describe('MPT-8230 Invitation Flow Tests for new users', { tag: ['@invitation-flow', '@ui', '@slow'] }, () => {
  test.skip(process.env.USE_LIVE_DEMO === 'true', 'Live demo environment does not support invitation flow tests');
  test.describe.configure({ mode: 'parallel' });

  test.beforeEach('Login admin user', async ({ loginPage }) => {
    invitationEmail = generateRandomEmail();
    inviteLink = `${process.env.BASE_URL}/invited?email=${encodeURIComponent(invitationEmail)}`;
    await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    await loginPage.waitForLoadingPageImgToDisappear();
  });

  test(
    '[229865] Invite new user to organisation, user accepts',
    { tag: '@p1' },
    async ({ header, mainMenu, usersPage, usersInvitePage, registerPage, pendingInvitationsPage, emailVerificationPage, baseRequest }) => {
      test.slow();

      await test.step('Navigate to the invitation page', async () => {
        await mainMenu.clickUserManagement();
        await usersPage.clickInviteBtn();
      });

      await test.step('Invite a new user to the organisation', async () => {
        await usersInvitePage.inviteUser(invitationEmail);
        await usersInvitePage.userInvitedAlert.waitFor();
        await usersInvitePage.userInvitedAlertCloseButton.click();
      });

      await test.step('Sign out Admin user', async () => {
        await header.signOut();
      });

      await test.step('Sign up user', async () => {
        await registerPage.navigateToRegistration(inviteLink);
        await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
      });

      await test.step('Set verification code', async () => {
        await emailVerificationPage.waitForVerificationCodeResetTimeout();
        await baseRequest.setVerificationCode(invitationEmail, verificationCode);
      });

      await test.step('Verify and accept invitation from email', async () => {
        await emailVerificationPage.verifyCodeAndConfirm(verificationCode);
        await emailVerificationPage.proceedToFinOps();
        await pendingInvitationsPage.acceptInviteFlow();
      });

      await test.step('Assert organization', async () => {
        if (process.env.BASE_URL === process.env.STAGING) {
          await expect(header.organizationSelect).toContainText('Marketplace Platform');
        } else {
          await expect(header.organizationSelect).toContainText('SoftwareOne (Test Env');
        }
      });
    }
  );

  test('[229866] Invite new user to organisation, but user declines', async ({
    header,
    mainMenu,
    usersPage,
    usersInvitePage,
    registerPage,
    pendingInvitationsPage,
    emailVerificationPage,
    baseRequest,
  }) => {
    test.setTimeout(120000);

    await test.step('Navigate to the invitation page', async () => {
      await mainMenu.clickUserManagement();
      await usersPage.clickInviteBtn();
    });

    await test.step('Invite a new user to the organisation', async () => {
      await usersInvitePage.inviteUser(invitationEmail);
      await usersInvitePage.userInvitedAlert.waitFor();
      await usersInvitePage.userInvitedAlertCloseButton.click();
    });

    await test.step('Sign out Admin user', async () => {
      await header.signOut();
    });

    await test.step('Sign up user', async () => {
      await registerPage.navigateToRegistration(inviteLink);
      await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
    });

    await test.step('Set verification code', async () => {
      await emailVerificationPage.waitForVerificationCodeResetTimeout();
      await baseRequest.setVerificationCode(invitationEmail, verificationCode);
    });

    await test.step('Verify and decline invitation from email', async () => {
      await emailVerificationPage.verifyCodeAndConfirm(verificationCode);
      await emailVerificationPage.proceedToFinOps();
      await pendingInvitationsPage.declineInviteFlow();
    });

    await test.step('Assert no pending invitations message', async () => {
      await expect(pendingInvitationsPage.noPendingInvitationsMessage).toBeVisible();
    });
  });

  test('[229867] Invite new user to organisation, who has previously declined @slow', async ({
    header,
    loginPage,
    mainMenu,
    usersPage,
    usersInvitePage,
    registerPage,
    pendingInvitationsPage,
    emailVerificationPage,
    baseRequest,
  }) => {
    test.setTimeout(120000);

    await test.step('Navigate to the invitation page', async () => {
      await mainMenu.clickUserManagement();
      await usersPage.clickInviteBtn();
    });

    await test.step('Invite a new user to the organisation', async () => {
      await usersInvitePage.inviteUser(invitationEmail);
      await usersInvitePage.userInvitedAlert.waitFor();
      await usersInvitePage.userInvitedAlertCloseButton.click();
    });

    await test.step('Sign out Admin user', async () => {
      await header.signOut();
    });

    await test.step('Sign up user', async () => {
      await registerPage.navigateToRegistration(inviteLink);
      await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
    });

    await test.step('Set verification code', async () => {
      await emailVerificationPage.waitForVerificationCodeResetTimeout();
      await baseRequest.setVerificationCode(invitationEmail, verificationCode);
    });

    await test.step('Verify and decline invitation from email', async () => {
      await emailVerificationPage.verifyCodeAndConfirm(verificationCode);
      await emailVerificationPage.proceedToFinOps();
      await pendingInvitationsPage.declineInviteFlow();
    });

    await test.step('Assert no pending invitations message', async () => {
      await expect(pendingInvitationsPage.noPendingInvitationsMessage).toBeVisible();
    });

    await test.step('Sign out user', async () => {
      await header.signOut();
    });

    await test.step('Log back in as admin', async () => {
      await loginPage.loginWithoutNavigation(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    });
    await test.step('Navigate to the invitation page', async () => {
      await mainMenu.clickUserManagement();
      await usersPage.clickInviteBtn();
    });

    await test.step('Invite a new user to the organisation', async () => {
      await usersInvitePage.inviteUser(invitationEmail);
      await usersInvitePage.userInvitedAlert.waitFor();
      await usersInvitePage.userInvitedAlertCloseButton.click();
    });

    await test.step('Sign out Admin user', async () => {
      await header.signOut();
    });

    await test.step('Login as new user', async () => {
      await registerPage.navigateToRegistration(inviteLink);
      await registerPage.clickAlreadyHaveAccountLink();
      await loginPage.loginWithPreFilledEmail(process.env.Default_USER_PASSWORD);
    });

    await test.step('Accept invitation', async () => {
      await pendingInvitationsPage.clickAcceptBtn();
    });

    await test.step('Assert organization', async () => {
      const orgName = header.getOrganizationNameForEnvironment();
      await expect(header.organizationSelect).toContainText(orgName);
    });
  });
});

test.describe('MPT-8229 Validate invitations in the settings', { tag: ['@invitation-flow', '@ui', '@slow'] }, () => {
  test.skip(process.env.USE_LIVE_DEMO === 'true', 'Live demo environment does not support invitation flow tests');

  test('[229868] Invitation is visible in Settings Tab @slow', async ({
    loginPage,
    header,
    mainMenu,
    usersPage,
    usersInvitePage,
    registerPage,
    settingsPage,
    pendingInvitationsPage,
    emailVerificationPage,
    baseRequest,
  }) => {
    test.setTimeout(120000);
    const poolName = usersPage.getPoolNameForEnvironment();

    await test.step('Login as Admin user', async () => {
      invitationEmail = generateRandomEmail();
      inviteLink = `${process.env.BASE_URL}/invited?email=${encodeURIComponent(invitationEmail)}`;

      await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
      await loginPage.waitForLoadingPageImgToDisappear();
    });

    await test.step('Navigate to the invitation page', async () => {
      await mainMenu.clickUserManagement();
      await usersPage.clickInviteBtn();
    });

    await test.step('Invite a new user to the organisation', async () => {
      await usersInvitePage.inviteUser(invitationEmail);
      await usersInvitePage.userInvitedAlert.waitFor();
      await usersInvitePage.userInvitedAlertCloseButton.click();
    });

    await test.step('Sign out Admin user', async () => {
      await header.signOut();
    });

    await test.step('Sign up user', async () => {
      await registerPage.navigateToRegistration(inviteLink);
      await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
    });

    await test.step('Set verification code', async () => {
      await emailVerificationPage.waitForVerificationCodeResetTimeout();
      await baseRequest.setVerificationCode(invitationEmail, verificationCode);
    });

    await test.step('Verify and accept invitation from email', async () => {
      await emailVerificationPage.verifyCodeAndConfirm(verificationCode);
      await emailVerificationPage.proceedToFinOps();
      await pendingInvitationsPage.acceptInviteFlow();
    });

    await test.step('Verify no pending invitations in Settings tab', async () => {
      await mainMenu.clickSettings();
      await settingsPage.clickInvitationsTab();
      await expect(settingsPage.page.getByText('No invitations pending')).toBeVisible();
    });

    await test.step('Sign out user', async () => {
      await header.signOut();
    });

    await test.step('Log back in as admin', async () => {
      await loginPage.loginWithoutNavigation(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    });
    await test.step('Navigate to the invitation page', async () => {
      await mainMenu.clickUserManagement();
      await usersPage.clickInviteBtn();
    });

    await test.step('Invite a existing user to the organisation', async () => {
      await usersInvitePage.inviteUser(invitationEmail, 'Engineer', poolName);
      await usersInvitePage.userInvitedAlert.waitFor();
      await usersInvitePage.userInvitedAlertCloseButton.click();
    });

    await test.step('Sign out Admin user', async () => {
      await header.signOut();
    });

    await test.step('Login as new user', async () => {
      await loginPage.loginWithoutNavigation(invitationEmail, process.env.DEFAULT_USER_PASSWORD);
    });

    await test.step('View invitation in Settings', async () => {
      await settingsPage.navigateToURL();
      await settingsPage.clickInvitationsTab();
      await expect(settingsPage.page.getByText(`● Engineer at ${poolName}`)).toBeVisible();
    });
  });
});

test.describe('MPT-8231 Invitation Flow Tests for an existing user', { tag: ['@invitation-flow', '@ui', '@slow'] }, () => {
  test.skip(process.env.USE_LIVE_DEMO === 'true', 'Live demo environment does not support invitation flow tests');

  test('[229869] Invite existing user with a new role @slow', async ({
    header,
    loginPage,
    mainMenu,
    usersPage,
    usersInvitePage,
    registerPage,
    settingsPage,
    pendingInvitationsPage,
    emailVerificationPage,
    baseRequest,
  }) => {
    test.setTimeout(120000);
    const poolName = usersPage.getPoolNameForEnvironment();

    await test.step('Login as Admin user', async () => {
      invitationEmail = generateRandomEmail();
      inviteLink = `${process.env.BASE_URL}/invited?email=${encodeURIComponent(invitationEmail)}`;

      await loginPage.login(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
      await loginPage.waitForLoadingPageImgToDisappear();
    });

    await test.step('Navigate to the invitation page', async () => {
      await mainMenu.clickUserManagement();
      await usersPage.clickInviteBtn();
    });

    await test.step('Invite a new user to the organisation', async () => {
      await usersInvitePage.inviteUser(invitationEmail);
      await usersInvitePage.userInvitedAlert.waitFor();
      await usersInvitePage.userInvitedAlertCloseButton.click();
    });

    await test.step('Sign out Admin user', async () => {
      await header.signOut();
    });

    await test.step('Sign up user', async () => {
      await registerPage.navigateToRegistration(inviteLink);
      await registerPage.registerUser('Test User', process.env.DEFAULT_USER_PASSWORD);
    });

    await test.step('Set verification code', async () => {
      await emailVerificationPage.waitForVerificationCodeResetTimeout();
      await baseRequest.setVerificationCode(invitationEmail, verificationCode);
    });

    await test.step('Verify and accept invitation from email', async () => {
      await emailVerificationPage.verifyCodeAndConfirm(verificationCode);
      await emailVerificationPage.proceedToFinOps();
      await pendingInvitationsPage.acceptInviteFlow();
    });

    await test.step('Sign out user', async () => {
      await header.signOut();
    });

    await test.step('Log back in as admin', async () => {
      await loginPage.loginWithoutNavigation(process.env.DEFAULT_USER_EMAIL, process.env.DEFAULT_USER_PASSWORD);
    });
    await test.step('Navigate to the invitation page', async () => {
      await mainMenu.clickUserManagement();
      await usersPage.clickInviteBtn();
    });

    await test.step('Invite a existing user to the organisation', async () => {
      await usersInvitePage.inviteUser(invitationEmail, 'Manager', poolName);
      await usersInvitePage.userInvitedAlert.waitFor();
      await usersInvitePage.userInvitedAlertCloseButton.click();
    });

    await test.step('Sign out Admin user', async () => {
      await header.signOut();
    });

    await test.step('Login as new user', async () => {
      await loginPage.loginWithoutNavigation(invitationEmail, process.env.DEFAULT_USER_PASSWORD);
    });

    await test.step('View invitation in Settings', async () => {
      await settingsPage.navigateToURL();
      await settingsPage.clickInvitationsTab();
      await expect(settingsPage.page.getByText(`● Manager at ${poolName} pool`)).toBeVisible();
    });
  });
});
