import { useParams } from "react-router-dom";
import MlTaskRun from "components/MlTaskRun";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import MlTasksService from "services/MlTasksService";

const MlTaskRunContainer = () => {
  const { runId } = useParams();

  const { organizationId } = useOrganizationInfo();

  const { useGetTaskRun } = MlTasksService();

  const { isLoading, isDataReady, run } = useGetTaskRun(organizationId, runId);

  return <MlTaskRun run={run} organizationId={organizationId} isLoading={isLoading} isDataReady={isDataReady} />;
};

export default MlTaskRunContainer;
