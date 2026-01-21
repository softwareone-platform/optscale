/* eslint-disable playwright/no-conditional-in-test,  playwright/no-conditional-expect */
import { test } from '../fixtures/page.fixture';
import { expect } from '@playwright/test';
import { isWithinRoundingDrift } from '../utils/custom-assertions';
import { getCardMetaData } from '../mocks/recommendation-card-metadata.mocks';
import { debugLog, errorLog } from '../utils/debug-logging';

test.describe('[MPT-11310] Recommendations page tests', { tag: ['@ui', '@recommendations'] }, () => {
  test.describe.configure({ mode: 'parallel' });
  test.use({ restoreSession: true });

  test.beforeEach(async ({ recommendationsPage }) => {
    await test.step('Login as FinOps user', async () => {
      await recommendationsPage.navigateToURL();
      await recommendationsPage.waitForAllProgressBarsToDisappear();
    });
    await recommendationsPage.selectDataSource('All');
    await recommendationsPage.selectCategory('All');
  });

  test('[230511] Verify Card total savings match possible monthly savings', { tag: '@p1' }, async ({ recommendationsPage }) => {
    let possibleMonthlySavings: number;
    let cardTotalSavings: number;

    await test.step('Get possible monthly savings', async () => {
      possibleMonthlySavings = await recommendationsPage.getPossibleMonthlySavingsValue();
    });

    await test.step('Get card total possible savings', async () => {
      cardTotalSavings = await recommendationsPage.calculateTotalSavingsFromCards();
    });

    await test.step('Compare card total savings with possible monthly savings', async () => {
      debugLog(`Possible Monthly Savings: ${possibleMonthlySavings}`);
      debugLog(`Card Total Savings: ${cardTotalSavings}`);
      expect(isWithinRoundingDrift(possibleMonthlySavings, cardTotalSavings, 0.001)).toBe(true); // Allowable drift of 0.1%
    });
  });

  test('[230597] Verify Data Source selection works correctly', async ({ recommendationsPage }) => {
    const dataSource = process.env.USE_LIVE_DEMO === 'true' ? 'Azure QA' : 'CPA (Development and Test)';

    await recommendationsPage.selectDataSource(dataSource);
    await recommendationsPage.clickFirstSeeAllButton();

    const cells = await recommendationsPage.modalColumn2.all();
    for (const cell of cells) {
      const link =
        process.env.USE_LIVE_DEMO === 'true'
          ? cell.locator(recommendationsPage.azureQALink)
          : cell.locator(recommendationsPage.cpaDevelopmentAndTestLink);
      await expect.soft(link).toBeVisible();
    }
  });

  // Interim solution to handle the where no duplicate checks have been run in this test is scenario encountered.
  // TODO - add a separate test with mocked data to test the scenario where no duplicate checks have been run.
  test('[230513] Verify S3 Duplicate Possible monthly savings matches that on S3 Duplicate Finder page', async ({
    recommendationsPage,
    s3DuplicateFinder,
  }) => {
    let captionText: string;
    await test.step('Determine whether duplicate check run is completed', async () => {
      captionText = await recommendationsPage.s3DuplicatesCaption.textContent();
    });

    if (captionText === 'No successfully completed checks') {
      await test.step('Verify behaviour is correct if no completed duplicate checks', async () => {
        debugLog('No successfully completed checks found.');

        // eslint-disable-next-line playwright/no-nested-step
        await test.step('Verify S3 Duplicate Finder table shows no duplicate checks message', async () => {
          await recommendationsPage.clickS3DuplicatesCard();
          await expect
            .soft(s3DuplicateFinder.tableFirstRow)
            .toHaveText('No duplicate checks, create a new one using the "Run check" button.');
        });
      });
      return;
    }
    await test.step('Compare S3 Duplicates possible savings matches total of savings on s3 Duplicate finder table', async () => {
      const possibleMonthlySavings = await recommendationsPage.getS3DuplicateFinderPossibleMonthlySavingsValue();
      await recommendationsPage.clickS3DuplicatesCard();
      const s3DuplicateFinderPageSavings = await s3DuplicateFinder.getSavingsFromTable();

      debugLog(`Possible Monthly Savings: ${possibleMonthlySavings}`);
      debugLog(`S3 Duplicate Finder Page Savings: ${s3DuplicateFinderPageSavings}`);
      expect(s3DuplicateFinderPageSavings).toBeCloseTo(possibleMonthlySavings, 0);
    });
  });

  test('[230514] Verify Search functionality works correctly', async ({ recommendationsPage }) => {
    await recommendationsPage.searchByName('Public');

    await recommendationsPage.allCardHeadings.last().waitFor();
    const count = await recommendationsPage.allCardHeadings.count();
    debugLog(`Number of card headings found: ${count}`);

    expect.soft(count).toBe(1);
    await expect(recommendationsPage.allCardHeadings.first()).toHaveText('Public S3 buckets');
  });

  test(
    '[230598] Verify only the correct applicable services are displayed for SWO Customisation',
    { tag: '@p1' },
    async ({ recommendationsPage }) => {
      await test.step('Verify applicable services combo box options shows expected items', async () => {
        await recommendationsPage.applicableServices.click();
        const expectedVisibleServices = [
          recommendationsPage.liAwsIAM,
          recommendationsPage.liAwsEC2,
          recommendationsPage.liAwsEC2EBS,
          recommendationsPage.liAwsEC2VPC,
          recommendationsPage.liAwsRDS,
          recommendationsPage.liAwsS3,
          recommendationsPage.liAwsKinesis,
          recommendationsPage.liAzureCompute,
          recommendationsPage.liAzureNetwork,
          recommendationsPage.liGcpIAM,
          recommendationsPage.liGcpCloudStorage,
        ];
        const expectedHiddenServices = [
          recommendationsPage.liAliBabaECS,
          recommendationsPage.liAliBabaVPC,
          recommendationsPage.liAliBabaEBS,
          recommendationsPage.liAliBabaSLB,
        ];

        for (const service of expectedVisibleServices) {
          await expect.soft(service).toBeVisible();
        }
        for (const service of expectedHiddenServices) {
          await expect.soft(service).toBeHidden();
        }
      });

      await test.step('Verify that no AliBaba applicable services are displayed on any cards', async () => {
        await recommendationsPage.liAll.click();
        await recommendationsPage.allCardHeadings.last().waitFor();
        const aliBabaIcons = [
          recommendationsPage.aliBabaEBS_Icon,
          recommendationsPage.aliBabaECS_Icon,
          recommendationsPage.aliBabaSLB_Icon,
          recommendationsPage.aliBabaECS_VPC_Icon,
          recommendationsPage.aliBabaRDS_Icon,
        ];

        for (const icon of aliBabaIcons) {
          await expect.soft(icon).toBeHidden();
        }
      });

      await test.step('Verify that no AliBaba applicable services are displayed in the applicable services column of the table', async () => {
        await recommendationsPage.clickTableButton();
        await recommendationsPage.allNameTableButtons.last().waitFor();
        const cells = await recommendationsPage.applicableServicesColumn.all();

        for (const cell of cells) {
          const aliBabaIcons = [
            recommendationsPage.aliBabaEBS_Icon,
            recommendationsPage.aliBabaECS_Icon,
            recommendationsPage.aliBabaSLB_Icon,
            recommendationsPage.aliBabaECS_VPC_Icon,
            recommendationsPage.aliBabaRDS_Icon,
          ];
          for (const icon of aliBabaIcons) {
            await expect.soft(cell.locator(icon)).toBeHidden();
          }
        }
      });
    }
  );

  const verifyCardsAndTable = async (recommendationsPage: any, category: string, expectedCardHeadings: string[]) => {
    await recommendationsPage.selectCategory(category);
    await recommendationsPage.allCardHeadings.last().waitFor();

    const count = await recommendationsPage.allCardHeadings.count();
    debugLog(`Number of card headings found for ${category}: ${count}`);

    const actualHeadings = await recommendationsPage.allCardHeadings.allTextContents();
    debugLog(`Actual heading texts: ${actualHeadings}`);

    const expectedSorted = [...expectedCardHeadings].sort();
    const actualSorted = actualHeadings.map((t: string) => t.trim()).sort();

    expect.soft(actualSorted).toEqual(expectedSorted);

    await recommendationsPage.clickTableButton();
    await recommendationsPage.allNameTableButtons.nth(count - 1).waitFor();
    expect.soft(await recommendationsPage.allNameTableButtons.count()).toBe(count);
    const buttonNames = await recommendationsPage.allNameTableButtons.allTextContents();

    const buttonNamesSorted = buttonNames.map((t: string) => t.trim()).sort();

    expect(buttonNamesSorted).toEqual(expectedSorted);
  };

  const allExpectedCardHeadings = [
    'Abandoned Amazon S3 buckets',
    'Abandoned Images',
    'Abandoned instances',
    'Abandoned Kinesis Streams',
    'Abandoned Load Balancers',
    'IAM users with unused console access',
    'Inactive IAM users',
    'Instances eligible for generation upgrade',
    'Instances for shutdown',
    'Resources with insecure Security Groups settings',
    'Instances with migration opportunities',
    'Instances with Spot (Preemptible) opportunities',
    'Instances with Subscription opportunities',
    'Intelligent Tiering',
    'Not attached Volumes',
    'Not deallocated Instances',
    'Obsolete IPs',
    'Obsolete snapshot chains',
    'Obsolete snapshots',
    'Public S3 buckets',
    'Reserved instances opportunities',
    'Snapshots with non-used Images',
    'Underutilized instances',
    'Underutilized RDS Instances',
  ];

  // eslint-disable-next-line playwright/expect-expect
  test('[230515] Verify all expected cards are present when All category selected', async ({ recommendationsPage }) => {
    await verifyCardsAndTable(recommendationsPage, 'All', allExpectedCardHeadings);
  });

  test(`[231467] Verify no cards are displaying errors`, async ({ recommendationsPage }) => {
    await recommendationsPage.selectCategory('All');
    await recommendationsPage.allCardHeadings.last().waitFor();

    const allCardData = getCardMetaData(recommendationsPage);

    let errorCount = 0;
    for (const card of allCardData) {
      const { name, errorLocator } = card;
      const isVisible = await errorLocator.isVisible();
      if (isVisible) {
        errorLog(`Error found on card: ${name}: \n ${await errorLocator.getAttribute('aria-label')}`);
        errorCount++;
      }
    }
    expect(errorCount, 'No cards should be displaying errors').toBe(0);
  });
  // eslint-disable-next-line playwright/expect-expect
  test('[230518] Verify all expected cards are present when Savings category selected', async ({ recommendationsPage }) => {
    const expectedCardHeadings = [
      'Abandoned Amazon S3 buckets',
      'Abandoned Images',
      'Abandoned instances',
      'Abandoned Kinesis Streams',
      'Abandoned Load Balancers',
      'Instances eligible for generation upgrade',
      'Instances for shutdown',
      'Instances with migration opportunities',
      'Instances with Spot (Preemptible) opportunities',
      'Instances with Subscription opportunities',
      'Intelligent Tiering',
      'Not attached Volumes',
      'Not deallocated Instances',
      'Obsolete IPs',
      'Obsolete snapshot chains',
      'Obsolete snapshots',
      'Reserved instances opportunities',
      'Snapshots with non-used Images',
      'Underutilized instances',
      'Underutilized RDS Instances',
    ];
    await verifyCardsAndTable(recommendationsPage, 'Savings', expectedCardHeadings);
  });

  // eslint-disable-next-line playwright/expect-expect
  test('[230519] Verify all expected cards are present when Security category selected', async ({ recommendationsPage }) => {
    const expectedCardHeadings = [
      'IAM users with unused console access',
      'Inactive IAM users',
      'Resources with insecure Security Groups settings',
      'Public S3 buckets',
    ];
    await verifyCardsAndTable(recommendationsPage, 'Security', expectedCardHeadings);
  });

  test('[230520] Verify all cards display critical icon when Critical category selected', async ({ recommendationsPage }) => {
    await recommendationsPage.selectCategory('Critical');
    await recommendationsPage.allCardHeadings.last().waitFor();
    const count = await recommendationsPage.allCardHeadings.count();
    const actualHeadings = await recommendationsPage.allCardHeadings.allTextContents();
    debugLog(`Actual heading texts: ${actualHeadings}`);
    debugLog(`Number of card headings found: ${count}`);
    const criticalIconCount = await recommendationsPage.allCriticalIcon.count();
    debugLog(`Number of critical icons found: ${criticalIconCount}`);
    expect.soft(criticalIconCount).toBe(count);

    await recommendationsPage.clickTableButton();
    await recommendationsPage.allNameTableButtons.nth(criticalIconCount - 1).waitFor();
    expect.soft(await recommendationsPage.allNameTableButtons.count()).toBe(criticalIconCount);
    const buttonNames = await recommendationsPage.allNameTableButtons.allTextContents();

    const expectedSorted = actualHeadings.map((t: string) => t.trim()).sort();
    const buttonNamesSorted = buttonNames.map((t: string) => t.trim()).sort();

    expect.soft(buttonNamesSorted).toEqual(expectedSorted);
    const allStatuses = await recommendationsPage.statusColumn.allTextContents();
    for (const status of allStatuses) {
      expect(status.trim()).toBe('Critical');
    }
  });

  test('[230521] Verify that only cards with See Item buttons are displayed when Non-empty category selected', async ({
    recommendationsPage,
  }) => {
    await recommendationsPage.selectCategory('Non-empty');
    await recommendationsPage.allCardHeadings.last().waitFor();
    const count = await recommendationsPage.allCardHeadings.count();
    const actualHeadings = await recommendationsPage.allCardHeadings.allTextContents();
    debugLog(`Actual heading texts: ${actualHeadings}`);
    debugLog(`Number of card headings found: ${count}`);

    const seeAllBtnCount = await recommendationsPage.allSeeAllBtns.count();
    debugLog(`Number of See Item buttons found: ${seeAllBtnCount}`);
    expect.soft(seeAllBtnCount).toBe(count);

    await recommendationsPage.clickTableButton();
    await recommendationsPage.allNameTableButtons.nth(seeAllBtnCount - 1).waitFor();
    expect.soft(await recommendationsPage.allNameTableButtons.count()).toBe(seeAllBtnCount);
    const buttonNames = await recommendationsPage.allNameTableButtons.allTextContents();

    const expectedSorted = actualHeadings.map((t: string) => t.trim()).sort();
    const buttonNamesSorted = buttonNames.map((t: string) => t.trim()).sort();

    expect(buttonNamesSorted).toEqual(expectedSorted);
  });

  test('[230523] Verify filtering by applicable service works correctly', async ({ recommendationsPage }) => {
    await recommendationsPage.selectApplicableService('RDS');

    await recommendationsPage.allCardHeadings.last().waitFor();
    const actualHeadings = await recommendationsPage.allCardHeadings.allTextContents();
    const count = await recommendationsPage.allCardHeadings.count();
    debugLog(`Actual heading texts: ${actualHeadings}`);
    debugLog(`Number of card headings found: ${count}`);

    const awsRDSIconsInGrid = recommendationsPage.cardsGrid.locator(recommendationsPage.aws_RDS_Icon);
    await awsRDSIconsInGrid.nth(count - 1).waitFor();
    const rdsCount = await awsRDSIconsInGrid.count();
    debugLog(`Number of RDS cards found: ${rdsCount}`);
    expect.soft(rdsCount).toBe(count);

    await recommendationsPage.clickTableButton();
    await recommendationsPage.allNameTableButtons.nth(rdsCount - 1).waitFor();
    expect.soft(await recommendationsPage.allNameTableButtons.count()).toBe(rdsCount);
    const buttonNames = await recommendationsPage.allNameTableButtons.allTextContents();

    const expectedSorted = actualHeadings.map((t: string) => t.trim()).sort();
    const buttonNamesSorted = buttonNames.map((t: string) => t.trim()).sort();

    expect.soft(buttonNamesSorted).toEqual(expectedSorted);

    const cells = await recommendationsPage.applicableServicesColumn.all();
    for (const cell of cells) {
      const icon = cell.locator(recommendationsPage.aws_RDS_Icon);
      await expect.soft(icon).toBeVisible();
    }
  });

  const cardEntries = [
    'Abandoned Amazon S3 Buckets',
    'Abandoned Images',
    'Abandoned Instances',
    'Abandoned Kinesis Streams',
    'Abandoned Load Balancers',
    'Inactive IAM Users',
    `IAM Users With Unused Console Access`,
    'Instances Eligible for Generation Upgrade',
    'Instances for Shutdown',
    'Instances with Migration Opportunities',
    'Instances with Spot Preemptible Opportunities',
    'Instances with Subscription Opportunities',
    'Intelligent Tiering',
    'Not Attached Volumes',
    'Not Deallocated Instances',
    'Obsolete IPs',
    'Obsolete Snapshot Chains',
    'Obsolete Snapshots',
    `Public S3 Buckets`,
    'Reserved Instances Opportunities',
    `Resources With Insecure Security Groups Settings`,
    'Snapshots with non-used Images',
    'Under Utilized Instances',
    'Under Utilized RDS Instances',
  ];

  for (const cardName of cardEntries) {
    test(`[230524] ${cardName}: Cards displaying possible savings, should match itemised modal total and table total`, async ({
      recommendationsPage,
    }) => {
      // Find this card’s full metadata at runtime
      const allCardData = getCardMetaData(recommendationsPage);
      const card = allCardData.find(c => c.name === cardName);
      if (!card) throw new Error(`Card data not found for: ${cardName}`);

      const { savingsValue, countValue, seeAllBtn, tableLocator, modalColumnLocator } = card;
      let isApproximate: boolean;
      let cardSavings = undefined;
      let cardCount = undefined;

      if (savingsValue) {
        cardSavings = await recommendationsPage.getCurrencyValue(savingsValue);

        if (cardSavings === 0) {
          const value = await savingsValue.textContent();
          isApproximate = value.includes('≈');
          debugLog(`${cardName} Card shows approximate savings: ${isApproximate}`);
        }

        debugLog(`${cardName} Card Possible Savings: ${cardSavings}`);

        if (cardSavings === 0 && !isApproximate) {
          await test.step('Card savings is 0, check table and see-all button', async () => {
            await expect.soft(seeAllBtn).toBeHidden();
            await recommendationsPage.clickTableButton();
            expect.soft(await recommendationsPage.getCurrencyValue(tableLocator)).toBe(0);
          });
        } else {
          await recommendationsPage.skipTestIfMoreThan100Items(seeAllBtn);

          const itemisedSavings = await recommendationsPage.getItemisedSavingsFromModal(seeAllBtn, modalColumnLocator);

          await test.step('Compare modal itemised total and card savings', async () => {
            expect.soft(itemisedSavings).toBeCloseTo(cardSavings, 0);
          });

          await test.step('Compare modal and table savings', async () => {
            await recommendationsPage.clickTableButton();
            await recommendationsPage.waitForAllProgressBarsToDisappear();
            const tableSavings = await recommendationsPage.getCurrencyValue(tableLocator);
            debugLog(`${cardName} Table Savings: ${tableSavings}`);
            expect.soft(isWithinRoundingDrift(cardSavings, tableSavings, 0.001)).toBe(true); // Allowable drift of 0.1%
          });
        }
      } else {
        cardCount = await recommendationsPage.getCardCountValue(countValue);
        debugLog(`${cardName} Card Count: ${cardCount}`);
        const seeAllCount = await recommendationsPage.getItemCountFromSeeAllButton(seeAllBtn);
        debugLog(`${cardName} See All Button Count: ${seeAllCount}`);
        expect.soft(seeAllCount).toBeCloseTo(cardCount);
      }
    });
  }
});
