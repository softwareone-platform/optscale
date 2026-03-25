/* eslint-disable playwright/no-conditional-in-test,  playwright/no-conditional-expect */
import { test } from '../fixtures/page.fixture';
import { expect, Locator } from '@playwright/test';
import { debugLog } from '../utils/debug-logging';

test.describe('[MPT-18579] Perspective Tests', { tag: ['@ui', '@resources', '@perspectives', '@slow'] }, () => {
  test.describe.configure({ mode: 'default' });
  test.use({ restoreSession: true });
  test.slow();

  test('[232963] User can create an Expenses perspective and the chart options are saved and applied correctly', async ({
    resourcesPage,
    perspectivesPage,
  }) => {
    await resourcesPage.navigateToResourcesPageAndResetFilters();

    const filter = 'Region';
    const filterOption = 'East US';
    const categorizeBy = 'Resource type';
    const groupByTag = 'costcenter';
    const perspectiveName = `Test Perspective ${new Date().getTime()}`;

    await test.step('Select options to save as a perspective', async () => {
      await resourcesPage.selectFilterByText(filter, filterOption);
      await resourcesPage.clickExpensesTab();
      await resourcesPage.selectCategorizeBy(categorizeBy);
      await resourcesPage.selectGroupByTag(groupByTag);
      await resourcesPage.click(resourcesPage.savePerspectiveBtn);
    });

    await test.step('Verify perspective criteria matches those selected', async () => {
      await expect.soft(resourcesPage.savePerspectiveBreakDownByValue).toHaveText('Expenses');
      await expect.soft(resourcesPage.savePerspectiveCategorizeByValue).toHaveText(categorizeBy);
      await expect.soft(resourcesPage.savePerspectiveGroupByTypeValue).toContainText('Tag');
      await expect.soft(resourcesPage.savePerspectiveGroupByValue).toHaveText(groupByTag);
      await expect.soft(resourcesPage.savePerspectiveFiltersValue).toContainText(filter);
      await expect.soft(resourcesPage.savePerspectiveFiltersOptionValue).toContainText(filterOption);
    });

    let perspectiveBtn: Locator;
    await test.step('Save perspective and verify it appears in the perspectives list', async () => {
      await resourcesPage.savePerspective(perspectiveName);
      await resourcesPage.click(resourcesPage.perspectivesBtn);
      perspectiveBtn = await resourcesPage.getPerspectivesButtonByName(perspectiveName);
      await expect(perspectiveBtn).toBeVisible();
    });

    await test.step('Navigate to perspective page and validate the perspective in the table', async () => {
      await resourcesPage.perspectivesSeeAllPerspectivesLink.click();
      const perspectiveRow = await perspectivesPage.getTableRowByPerspectiveName(perspectiveName);
      await expect.soft(perspectiveRow.locator(perspectivesPage.breakdownByColumn)).toHaveText('Expenses');
      await expect.soft(perspectiveRow.locator(perspectivesPage.categorizeByColumn)).toHaveText(categorizeBy);
      await expect.soft(perspectiveRow.locator(perspectivesPage.groupByColumn)).toContainText('Tag');
      await expect.soft(perspectiveRow.locator(perspectivesPage.groupByColumn)).toContainText(groupByTag);
      await expect.soft(perspectiveRow.locator(perspectivesPage.filtersColumn)).toContainText(filter);
      await expect.soft(perspectiveRow.locator(perspectivesPage.filtersColumn)).toContainText(filterOption);
    });

    await test.step('Return to the resources page and return to default view', async () => {
      await resourcesPage.navigateToResourcesPageAndResetFilters();
      await resourcesPage.selectCategorizeBy('Service');
      expect.soft(await resourcesPage.selectedComboBoxOption(resourcesPage.categorizeBySelect)).toBe('Service');
      await expect.soft(resourcesPage.clearIcon).toBeHidden();
    });

    await test.step('Apply perspective and validate the chart options are applied correctly', async () => {
      await resourcesPage.applyPerspective(perspectiveBtn);
      const activeFilter = resourcesPage.getActiveFilter();
      await expect.soft(activeFilter).toHaveText(`${filter} (${filterOption})`);

      expect.soft(await resourcesPage.isAriaSelected(resourcesPage.tabExpensesBtn)).toBe(true);
      expect.soft(await resourcesPage.selectedComboBoxOption(resourcesPage.categorizeBySelect)).toBe(categorizeBy);
      await expect.soft(resourcesPage.selectedGroupByTagItem).toBeVisible();
      await expect.soft(resourcesPage.selectedGroupByTagKey).toContainText('Tag:');
      await expect.soft(resourcesPage.selectedGroupByTagValue).toHaveText(groupByTag);
    });
  });

  test('[232964] User can create perspective for resource count and the perspective is saved and applied correctly', async ({
    resourcesPage,
  }) => {
    await resourcesPage.navigateToResourcesPageAndResetFilters();

    const filter = 'Recommendations';
    const filterOption = 'With recommendations';
    const categorizeBy = 'Region';
    const perspectiveName = `Test Perspective ${new Date().getTime()}`;

    await test.step('Select options to save as a perspective', async () => {
      await resourcesPage.selectFilterByText(filter, filterOption);
      await resourcesPage.clickResourceCountTab();
      await resourcesPage.selectCategorizeBy(categorizeBy);
      await resourcesPage.click(resourcesPage.savePerspectiveBtn);
    });

    await test.step('Verify perspective criteria matches those selected', async () => {
      await expect.soft(resourcesPage.savePerspectiveBreakDownByValue).toHaveText('Resource count');
      await expect.soft(resourcesPage.savePerspectiveCategorizeByValue).toHaveText(categorizeBy);
      await expect.soft(resourcesPage.savePerspectiveFiltersValue).toContainText(filter);
      await expect.soft(resourcesPage.savePerspectiveFiltersOptionValue).toContainText(filterOption);
    });

    await test.step('Save perspective', async () => {
      await resourcesPage.savePerspective(perspectiveName);
    });

    await test.step('Return to the resources page and return to default view', async () => {
      await resourcesPage.navigateToResourcesPageAndResetFilters();
      await resourcesPage.selectCategorizeBy('Service');
      expect.soft(await resourcesPage.selectedComboBoxOption(resourcesPage.categorizeBySelect)).toBe('Service');
      await expect.soft(resourcesPage.clearIcon).toBeHidden();
    });

    await test.step('Apply perspective and validate the chart options are applied correctly', async () => {
      await resourcesPage.applyPerspective(await resourcesPage.getPerspectivesButtonByName(perspectiveName));

      const activeFilter = resourcesPage.getActiveFilter();
      await expect.soft(activeFilter).toHaveText(`${filter} (${filterOption})`);
      expect.soft(await resourcesPage.isAriaSelected(resourcesPage.tabResourceCountBtn)).toBe(true);
      expect.soft(await resourcesPage.selectedComboBoxOption(resourcesPage.categorizeBySelect)).toBe(categorizeBy);
    });
  });

  test('[232965] User can create a perspective a Tags chart is saved and applied correctly', async ({ resourcesPage }) => {
    await resourcesPage.navigateToResourcesPageAndResetFilters();

    const filter = 'Pool';
    const filterOption = 'Marketplace (Dev)';
    const perspectiveName = `Test Perspective ${new Date().getTime()}`;

    await test.step('Select options to save as a perspective', async () => {
      await resourcesPage.selectFilterByText(filter, filterOption);
      await resourcesPage.clickTagsTab();
      await resourcesPage.click(resourcesPage.savePerspectiveBtn);
    });

    await test.step('Verify perspective criteria matches those selected', async () => {
      await expect.soft(resourcesPage.savePerspectiveBreakDownByValue).toHaveText('Tags');
      await expect.soft(resourcesPage.savePerspectiveFiltersValue).toContainText(filter);
      await expect.soft(resourcesPage.savePerspectiveFiltersOptionValue).toContainText(filterOption);
    });

    await test.step('Save perspective', async () => {
      await resourcesPage.savePerspective(perspectiveName);
    });

    await test.step('Return to the resources page and return to default view', async () => {
      await resourcesPage.navigateToResourcesPageAndResetFilters();
      await resourcesPage.selectCategorizeBy('Service');
      expect.soft(await resourcesPage.selectedComboBoxOption(resourcesPage.categorizeBySelect)).toBe('Service');
      await expect.soft(resourcesPage.clearIcon).toBeHidden();
    });

    await test.step('Apply perspective and validate the chart options are applied correctly', async () => {
      await resourcesPage.applyPerspective(await resourcesPage.getPerspectivesButtonByName(perspectiveName));

      const activeFilter = resourcesPage.getActiveFilter();
      await expect.soft(activeFilter).toHaveText(`${filter} (${filterOption})`);
      expect.soft(await resourcesPage.isAriaSelected(resourcesPage.tabTagsBtn)).toBe(true);
    });
  });

  test('[232966] User can create a perspective for the Meta chart and the perspective is saved and applied correctly', async ({
    resourcesPage,
  }) => {
    await resourcesPage.navigateToResourcesPageAndResetFilters();

    const categorizeBy = 'OS';
    const breakdownType = 'Count';
    const perspectiveName = `Test Perspective ${new Date().getTime()}`;

    await test.step('Select options to save as a perspective', async () => {
      await resourcesPage.clickMetaTab();
      await resourcesPage.selectMetaCategorizeBy(categorizeBy);
      await resourcesPage.selectBreakdownType(breakdownType);
      await resourcesPage.click(resourcesPage.savePerspectiveBtn);
    });

    await test.step('Verify perspective criteria matches those selected', async () => {
      await expect.soft(resourcesPage.savePerspectiveBreakDownByValue).toHaveText('Meta');
      await expect.soft(resourcesPage.savePerspectiveCategorizeByValue).toHaveText(categorizeBy);
      await expect.soft(resourcesPage.savePerspectiveNoFiltersValue).toHaveText('-');
    });

    await test.step('Save perspective', async () => {
      await resourcesPage.savePerspective(perspectiveName);
    });

    await test.step('Return to the resources page and return to default view', async () => {
      await resourcesPage.navigateToResourcesPageAndResetFilters();
      await resourcesPage.selectCategorizeBy('Service');
      expect.soft(await resourcesPage.selectedComboBoxOption(resourcesPage.categorizeBySelect)).toBe('Service');
      await expect.soft(resourcesPage.clearIcon).toBeHidden();
    });

    await test.step('Apply perspective and validate the chart options are applied correctly', async () => {
      await resourcesPage.applyPerspective(await resourcesPage.getPerspectivesButtonByName(perspectiveName));

      await expect.soft(resourcesPage.getActiveFilter()).toBeHidden();
      expect.soft(await resourcesPage.isAriaSelected(resourcesPage.tabMetaBtn)).toBe(true);
      expect.soft(await resourcesPage.selectedComboBoxOption(resourcesPage.metaCategorizeBySelect)).toBe(categorizeBy);
    });
  });

  test('[232967] User can create a perspective and delete it via the perspectives table', async ({ resourcesPage, perspectivesPage }) => {
    await perspectivesPage.navigateToURL();
    const initialPerspectivesCount = await perspectivesPage.getPerspectivesCount();
    debugLog(`Initial perspectives count: ${initialPerspectivesCount}`);

    await resourcesPage.navigateToResourcesPageAndResetFilters();

    const perspectiveName = `Test Perspective ${new Date().getTime()}`;

    await test.step('Create and save a perspective', async () => {
      await resourcesPage.clickExpensesTab();
      await resourcesPage.selectGroupByTag('environment');
      await resourcesPage.click(resourcesPage.savePerspectiveBtn);
      await resourcesPage.savePerspective(perspectiveName);
    });

    await test.step('Navigate to perspectives page and delete the perspective', async () => {
      await resourcesPage.click(resourcesPage.perspectivesBtn);
      await resourcesPage.perspectivesSeeAllPerspectivesLink.click();
      await perspectivesPage.deletePerspective(perspectiveName);
    });

    await test.step('Validate the perspective is deleted and the perspectives count is updated', async () => {
      await expect.soft(await perspectivesPage.getTableRowByPerspectiveName(perspectiveName)).toBeHidden();
      if (initialPerspectivesCount === 0) await expect.soft(perspectivesPage.noPerspectivesMessage).toBeVisible();
    });

    await test.step('That the perspectives button is hidden if initial perspective count was zero', async () => {
      await resourcesPage.navigateToURL();
      if (initialPerspectivesCount === 0) {
        await expect.soft(resourcesPage.perspectivesBtn).toBeHidden();
      } else {
        await resourcesPage.click(resourcesPage.perspectivesBtn);
        await expect.soft(await resourcesPage.getPerspectivesButtonByName(perspectiveName)).toBeHidden();
      }
    });
  });

  test('[232969] User can create a perspective with multiple filters', async ({ resourcesPage, perspectivesPage }) => {
    await resourcesPage.navigateToResourcesPageAndResetFilters();

    const filter1 = 'Region';
    const filterOption1 = 'West Europe';
    const filter2 = 'Recommendations';
    const filterOption2 = 'With recommendations';
    const perspectiveName = `Test Perspective ${new Date().getTime()}`;

    await test.step('Select options to save as a perspective', async () => {
      await resourcesPage.selectFilterByText(filter1, filterOption1);
      await resourcesPage.selectFilterByText(filter2, filterOption2);
      await resourcesPage.click(resourcesPage.savePerspectiveBtn);
      await resourcesPage.savePerspective(perspectiveName);
    });

    await test.step('Navigate to perspective page and validate the perspective in the table', async () => {
      await resourcesPage.click(resourcesPage.perspectivesBtn);
      await resourcesPage.perspectivesSeeAllPerspectivesLink.click();
      const perspectiveRow = await perspectivesPage.getTableRowByPerspectiveName(perspectiveName);
      await expect.soft(perspectiveRow.locator(perspectivesPage.filtersColumn)).toContainText(filter1);
      await expect.soft(perspectiveRow.locator(perspectivesPage.filtersColumn)).toContainText(filterOption1);
      await expect.soft(perspectiveRow.locator(perspectivesPage.filtersColumn)).toContainText(filter2);
      await expect.soft(perspectiveRow.locator(perspectivesPage.filtersColumn)).toContainText(filterOption2);
    });

    await test.step('Return to the resources page and return to default view', async () => {
      await resourcesPage.navigateToResourcesPageAndResetFilters();
      await resourcesPage.selectCategorizeBy('Service');
      expect.soft(await resourcesPage.selectedComboBoxOption(resourcesPage.categorizeBySelect)).toBe('Service');
      await expect.soft(resourcesPage.clearIcon).toBeHidden();
    });

    await test.step('Apply perspective and validate the chart options are applied correctly', async () => {
      await resourcesPage.applyPerspective(await resourcesPage.getPerspectivesButtonByName(perspectiveName));

      await expect.soft(resourcesPage.getActiveFilter().filter({ hasText: `${filter1} (${filterOption1})` })).toBeVisible();
      await expect.soft(resourcesPage.getActiveFilter().filter({ hasText: `${filter2} (${filterOption2})` })).toBeVisible();
    });
  });

  test('[232970] Creating a perspective with an existing name shows a message stating that the original will be overwritten', async ({
    resourcesPage,
  }) => {
    await resourcesPage.navigateToResourcesPageAndResetFilters();

    const filter1 = 'Region';
    const filterOption1 = 'West Europe';
    const filter2 = 'Recommendations';
    const filterOption2 = 'With recommendations';
    const perspectiveName = `Test Perspective ${new Date().getTime()}`;

    await test.step('Create and save a perspective', async () => {
      await resourcesPage.selectFilterByText(filter1, filterOption1);
      await resourcesPage.click(resourcesPage.savePerspectiveBtn);
      await resourcesPage.savePerspective(perspectiveName);
    });

    await test.step('Return to the resources page and return to default view', async () => {
        await resourcesPage.navigateToResourcesPageAndResetFilters();
    });

    await test.step('Attempt to create another perspective with the same name and validate the overwrite message is displayed', async () => {
      await resourcesPage.selectFilterByText(filter2, filterOption2);
      await resourcesPage.click(resourcesPage.savePerspectiveBtn);
      await resourcesPage.fillSavePerspectiveName(perspectiveName);

      await expect(resourcesPage.getPerspectiveOverwriteMessage(perspectiveName)).toBeVisible();
    });

    await test.step('Save the perspective', async () => {
      await resourcesPage.click(resourcesPage.savePerspectiveSaveBtn);
      await resourcesPage.savePerspectiveSaveBtn.waitFor({ state: 'detached' });
      await resourcesPage.waitForAllProgressBarsToDisappear();
    });

    await test.step('Reset filters and apply perspective to validate the updated filters are applied', async () => {
      await resourcesPage.resetFilters();
      await resourcesPage.applyPerspective(await resourcesPage.getPerspectivesButtonByName(perspectiveName));

      await expect(resourcesPage.getActiveFilter()).toHaveCount(1);
      await expect.soft(resourcesPage.getActiveFilter().filter({ hasText: `${filter1} (${filterOption1})` })).toBeHidden();
      await expect.soft(resourcesPage.getActiveFilter().filter({ hasText: `${filter2} (${filterOption2})` })).toBeVisible();
    });
  });

  test('[232968] No perspectives message is displayed and perspectives button is hidden if there are no perspectives', async ({
    resourcesPage,
    perspectivesPage,
  }) => {
    await test.step('Navigate to perspectives page and delete all perspectives', async () => {
      await perspectivesPage.navigateToURL();
      await perspectivesPage.waitForAllProgressBarsToDisappear();
      await perspectivesPage.deleteAllPerspectives();
      await expect.soft(perspectivesPage.noPerspectivesMessage).toBeVisible();
    });

    await test.step('Navigate to resources page and validate perspectives button is hidden', async () => {
      await resourcesPage.navigateToURL();
      await expect(resourcesPage.perspectivesBtn).toBeHidden();
    });
  });
});
