import { useParams } from "react-router-dom";
import RunArtifactsTable from "components/RunArtifactsTable";
import MlArtifactsContainer from "containers/MlArtifactsContainer";

type RunArtifactsContainerProps = {
  organizationId: string;
  arceeToken: string;
};

const RunArtifactsContainer = ({ organizationId, arceeToken }: RunArtifactsContainerProps) => {
  const { runId } = useParams() as { runId: string };

  return (
    <MlArtifactsContainer
      runId={runId}
      organizationId={organizationId}
      arceeToken={arceeToken}
      render={({ artifacts, pagination, search }) => (
        <RunArtifactsTable artifacts={artifacts} pagination={pagination} search={search} />
      )}
    />
  );
};

export default RunArtifactsContainer;
