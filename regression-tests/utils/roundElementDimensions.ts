import {Locator} from '@playwright/test';

export async function roundElementDimensions(locator: Locator | Locator[]) {
  const locators = Array.isArray(locator) ? locator : [locator];
  for (const l of locators) {
    await l.evaluateAll((elements) => {
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const roundedWidth = Math.round(rect.width);
        const roundedHeight = Math.round(rect.height);

        if (Math.abs(rect.width - roundedWidth) > 0.1) {
          (el as HTMLElement).style.width = `${roundedWidth}px`;
        }
        if (Math.abs(rect.height - roundedHeight) > 0.1) {
          (el as HTMLElement).style.height = `${roundedHeight}px`;
        }
      });
    });
  }
}
