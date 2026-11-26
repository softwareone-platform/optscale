import { act } from "react-dom/test-utils";

/** By `data-test-id` anywhere in the document: MUI menus, dialogs and side modals render outside the container. */
export const find = (testId: string) => document.querySelector<HTMLElement>(`[data-test-id='${testId}']`);

/** Clicks it and lets what the click starts settle. */
export const click = (testId: string) =>
  act(async () => {
    find(testId)!.click();
  });
