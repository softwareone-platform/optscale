import type { ReactNode } from "react";
import BaseSideModal from "@main/components/SideModalManager/SideModals/BaseSideModal";
import type { SideModalHeaderProps } from "components/SideModalHeader/SideModalHeader";

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
