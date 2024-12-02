import { ReactNode, useCallback, useState } from "react";
import CommunityDocsContext from "./CommunityDocsContext";

const CommunityDocsContextProvider = ({ children }: { children: ReactNode }) => {
  const [isCommunityDocsOpened, setIsCommunityDocsOpened] = useState(false);

  const toggleCommunityDocs = useCallback(() => {
    setIsCommunityDocsOpened((state) => !state);
  }, []);

  const openCommunityDocs = useCallback(() => {
    setIsCommunityDocsOpened(true);
  }, []);

  const closeCommunityDocs = useCallback(() => {
    setIsCommunityDocsOpened(false);
  }, []);

  return (
    <CommunityDocsContext.Provider
      value={{ isCommunityDocsOpened, toggleCommunityDocs, openCommunityDocs, closeCommunityDocs }}
    >
      {children}
    </CommunityDocsContext.Provider>
  );
};

export default CommunityDocsContextProvider;
