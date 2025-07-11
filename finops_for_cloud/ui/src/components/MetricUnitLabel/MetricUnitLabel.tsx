import { ReactNode } from "react";
import Tooltip from "components/Tooltip";
import { sliceByLimitWithEllipsis } from "utils/strings";

type MetricUnitLabelProps = {
  label: ReactNode;
  unit?: string;
  showUnitInParentheses?: boolean;
};

const MAX_UNIT_LENGTH = 15;

const Unit = ({ unit, showUnitInParentheses = false }: { unit: string; showUnitInParentheses?: boolean }) => {
  const render = () => {
    const isNameLong = unit.length > MAX_UNIT_LENGTH;

    return (
      <Tooltip title={isNameLong ? unit : undefined}>
        <span>{isNameLong ? sliceByLimitWithEllipsis(unit, MAX_UNIT_LENGTH) : unit}</span>
      </Tooltip>
    );
  };

  return showUnitInParentheses ? <>({render()})</> : render();
};

const MetricUnitLabel = ({ label, unit, showUnitInParentheses = false }: MetricUnitLabelProps) => (
  <span>
    {label}
    {unit && (
      <>
        {" "}
        <Unit unit={unit} showUnitInParentheses={showUnitInParentheses} />
      </>
    )}
  </span>
);

export default MetricUnitLabel;
