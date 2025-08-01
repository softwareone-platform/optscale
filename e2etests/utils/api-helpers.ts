import { Page } from '@playwright/test';

export async function fetchBreakdownExpenses<T>(
    page: Page,
    breakdownBy: string,
    selectCategorizeBy: (label: string) => Promise<void>,
    uiLabel: string
): Promise<T> {
    const [response] = await Promise.all([
        page.waitForResponse((resp) =>
            resp.url().includes(`/breakdown_expenses?breakdown_by=${breakdownBy}`) && resp.status() === 200
        ),
        selectCategorizeBy(uiLabel),
    ]);

    return response.json();
}