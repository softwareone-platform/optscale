import { useOpenSideModal } from "hooks/useOpenSideModal";

type OpenSideModal = <Payload>(SideModalClass: new (payload: Payload, close: () => void) => unknown, payload: Payload) => void;

/** `useOpenSideModal` with a type: its context is untyped, so `tsc` sees the opener as `unknown`. */
export const useOpenTypedSideModal = () => useOpenSideModal() as OpenSideModal;
