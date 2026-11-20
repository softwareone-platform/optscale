import { useEffect, useState } from "react";

// MUI portals dialogs and modal drawers (the app's side modals) into <body>; menus and popovers use their own classes.
const DIALOG_SELECTOR = ".MuiDialog-root, .MuiDrawer-modal";

const hasOpenDialog = () => document.querySelector(DIALOG_SELECTOR) !== null;

/** Whether an MUI dialog or side modal is open anywhere on the page, so the panel can rise above its backdrop. */
export const useIsDialogOpen = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(hasOpenDialog);

  useEffect(() => {
    const sync = () => setIsDialogOpen(hasOpenDialog());
    const observer = new MutationObserver(sync);

    observer.observe(document.body, { childList: true });
    // A dialog can close between the first render and this effect — a page change mid-fade, say.
    sync();

    return () => observer.disconnect();
  }, []);

  return isDialogOpen;
};
