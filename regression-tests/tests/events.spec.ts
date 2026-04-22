import { test } from '@/fixtures/page.fixture';
import { eventsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.use({ interceptAPI: { entries: eventsInterceptions } });

test('FFC: Events', async ({ eventsPage }) => {
  await eventsPage.navigateToURL();
  await eventsPage.clickEventsTable();
  await captureScreenshot(eventsPage.main, 'Events-Container--Expanded.png', {
    hoverAnchor: eventsPage.heading,
  });
});
