import { useMemo } from "react";
import { useParams } from "react-router-dom";
import MlExecutorsTable from "components/MlExecutorsTable";
import MlExecutorsService from "services/MlExecutorsService";

type ExecutorsProps = {
  organizationId: string;
  withExpenses: boolean;
  isPublicRun: boolean;
  arceeToken: string;
};

const Executors = ({ organizationId, withExpenses, isPublicRun, arceeToken }: ExecutorsProps) => {
  const { runId } = useParams();

  const { useGet } = MlExecutorsService();

  const runIds = useMemo(() => [runId], [runId]);

  const { isLoading, executors } = useGet({ runIds, organizationId, arceeToken });

  return (
    <MlExecutorsTable
      executors={executors}
      isLoading={isLoading}
      withExpenses={withExpenses}
      disableExecutorLink={isPublicRun}
      disableLocationLink={isPublicRun}
    />
  );
};

export default Executors;
