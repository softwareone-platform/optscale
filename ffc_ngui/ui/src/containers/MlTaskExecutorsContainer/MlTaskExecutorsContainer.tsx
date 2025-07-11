import { useMemo } from "react";
import { useParams } from "react-router-dom";
import MlExecutorsTable from "components/MlExecutorsTable";
import { useIsOptScaleCapabilityEnabled } from "hooks/useIsOptScaleCapabilityEnabled";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import MlExecutorsService from "services/MlExecutorsService";
import { OPTSCALE_CAPABILITY } from "utils/constants";

const MlTaskExecutorsContainer = () => {
  const { taskId } = useParams();

  const { useGet } = MlExecutorsService();

  const taskIds = useMemo(() => [taskId], [taskId]);

  const { organizationId } = useOrganizationInfo();

  const { isLoading, executors = [] } = useGet({ taskIds, organizationId });

  const isFinOpsEnabled = useIsOptScaleCapabilityEnabled(OPTSCALE_CAPABILITY.FINOPS);

  return <MlExecutorsTable isLoading={isLoading} executors={executors} withExpenses={isFinOpsEnabled} />;
};
export default MlTaskExecutorsContainer;
