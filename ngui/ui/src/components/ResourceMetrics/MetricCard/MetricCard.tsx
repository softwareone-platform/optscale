import WrapperCard from "components/WrapperCard";
import MetricChart from "../MetricChart";

const MetricCard = ({ title, isLoading, chartProps, dataTestIds = {} }) => (
  <WrapperCard title={title} variant="clean" dataTestIds={dataTestIds} needAlign>
    <MetricChart isLoading={isLoading} {...chartProps} />
  </WrapperCard>
);

export default MetricCard;
