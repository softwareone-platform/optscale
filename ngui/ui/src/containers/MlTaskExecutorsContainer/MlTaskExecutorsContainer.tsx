import { useMemo } from "react";
import { useParams } from "react-router-dom";
import MlExecutorsTable from "components/MlExecutorsTable";
import { useIsOptScaleModeEnabled } from "hooks/useIsOptScaleModeEnabled";
import MlExecutorsService from "services/MlExecutorsService";
import { OPTSCALE_MODE } from "utils/constants";

const MlTaskExecutorsContainer = () => {
  const { taskId } = useParams();

  const { useGet } = MlExecutorsService();

  const taskIds = useMemo(() => [taskId], [taskId]);

  const { isLoading, executors = [] } = useGet({ taskIds });

  const isFinOpsEnabled = useIsOptScaleModeEnabled(OPTSCALE_MODE.FINOPS);

  return <MlExecutorsTable isLoading={isLoading} executors={executors} withExpenses={isFinOpsEnabled} />;
};
export default MlTaskExecutorsContainer;
