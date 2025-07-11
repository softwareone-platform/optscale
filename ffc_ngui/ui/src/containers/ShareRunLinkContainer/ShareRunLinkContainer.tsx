import ShareRunLink from "components/ShareRunLink";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import MlProfilingService from "services/MlProfilingService";

type ShareRunLinkContainerProps = {
  runId: string;
};

const ShareRunLinkContainer = ({ runId }: ShareRunLinkContainerProps) => {
  const { useGetToken } = MlProfilingService();
  const { isLoading, md5Token } = useGetToken();

  const { organizationId } = useOrganizationInfo();

  return <ShareRunLink runId={runId} arceeToken={md5Token} organizationId={organizationId} isLoading={isLoading} />;
};

export default ShareRunLinkContainer;
