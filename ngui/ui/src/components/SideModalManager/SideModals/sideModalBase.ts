import type { ReactNode } from "react";
import type { SideModalHeaderProps } from "components/SideModalHeader/SideModalHeader";
import BaseSideModal from "components/SideModalManager/SideModals/BaseSideModal";

type SideModal<Payload> = {
  payload: Payload;
  closeSideModal: () => void;
  // `onClose` is the manager's to add.
  get headerProps(): Omit<SideModalHeaderProps, "onClose">;
  get content(): ReactNode;
  dataTestId: string;
};

/** `BaseSideModal` with a typed payload: the upstream class is untyped, so `tsc` cannot see what a subclass gets. */
export const sideModalBase = <Payload>() =>
  BaseSideModal as unknown as new (payload: Payload, close: () => void) => SideModal<Payload>;
