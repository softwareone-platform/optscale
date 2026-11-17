import { test } from '@/fixtures/page.fixture';
import { eventsInterceptions } from '@/mocks';
import { captureScreenshot } from '@/utils/screenshots';

test.describe('Events', () => {
  test.use({ interceptAPI: { entries: eventsInterceptions } });

  test('list page', async ({ eventsPage }) => {
    await eventsPage.navigateToURL();
    await captureScreenshot(eventsPage.header, 'Events-Header.png', { skipHover: true });
    await eventsPage.clickEventsTable();
    await captureScreenshot(eventsPage.pageContentWrapper, 'Events-Container--Expanded.png', {
      hoverAnchor: eventsPage.heading,
    });
  });
});
