import { useContext } from "react";
import CommunityDocsContext from "./CommunityDocsContext";

export const useCommunityDocsContext = () => {
  const context = useContext(CommunityDocsContext);

  if (!context) {
    throw new Error("useCommunityDocsContext must be used within the CommunityDocsProvider");
  }

  return context;
};
