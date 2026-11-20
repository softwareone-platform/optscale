import { useOpenSideModal as useUntypedOpenSideModal } from "@main/hooks/useOpenSideModal";

type OpenSideModal = <Payload>(SideModalClass: new (payload: Payload, close: () => void) => unknown, payload: Payload) => void;

/** Upstream's hook with a type: its context is untyped, so `tsc` sees the opener as `unknown`. */
export const useOpenSideModal = () => useUntypedOpenSideModal() as OpenSideModal;
