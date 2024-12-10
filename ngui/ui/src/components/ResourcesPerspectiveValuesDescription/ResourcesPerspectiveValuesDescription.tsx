import { Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FormattedMessage } from "react-intl";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { breakdowns } from "hooks/useBreakdownBy";
import { isEmpty as isEmptyArray } from "utils/arrays";
import { MPT_SPACING_1, MPT_SPACING_2, SPACING_1 } from "utils/layouts";

const getBreakdownByRenderData = (breakdownBy) => ({
  controlName: "categorizeBy",
  renderValue: () => breakdowns.find((breakdown) => breakdown.value === breakdownBy)?.name ?? null
});

const getGroupByRenderData = (groupBy) => ({
  controlName: "groupBy",
  renderValue: () => {
    if (!groupBy.groupType) {
      return <FormattedMessage id="none" />;
    }
    if (groupBy.groupType === "tag") {
      return <KeyValueLabel keyMessageId={groupBy.groupType} value={groupBy.groupBy} />;
    }
    return <FormattedMessage id={groupBy.groupType} />;
  }
});

const getBreakdownStateValueRenderer = (name) =>
  ({
    breakdownBy: getBreakdownByRenderData,
    groupBy: getGroupByRenderData
  })[name] ?? (() => null);

const ResourcesPerspectiveValuesDescription = ({ breakdownBy, breakdownData = {}, filters = [] }) => (
  <Stack spacing={SPACING_1} paddingTop={MPT_SPACING_2}>
    <KeyValueLabel keyMessageId="breakdownBy" isBoldValue value={<FormattedMessage id={breakdownBy} />} />
    {Object.entries(breakdownData)
      .map(([name, value]) => {
        const renderer = getBreakdownStateValueRenderer(name);

        return renderer(value);
      })
      .filter(Boolean)
      .map(({ controlName, renderValue }) => (
        <KeyValueLabel key={controlName} isBoldValue keyMessageId={controlName} value={renderValue()} />
      ))}
    <div>
      {isEmptyArray(filters) ? (
        <KeyValueLabel keyMessageId="filters" value="-" />
      ) : (
        <>
          <Typography variant="subtitle1" component="h3" marginTop={MPT_SPACING_1} gutterBottom>
            <FormattedMessage id="filters" />
          </Typography>
          {filters.map(({ name, displayedName, displayedValue }) => (
            <KeyValueLabel
              key={name}
              sx={{ marginBottom: MPT_SPACING_1 }}
              isBoldValue
              keyText={displayedName}
              value={displayedValue}
            />
          ))}
        </>
      )}
    </div>
  </Stack>
);

export default ResourcesPerspectiveValuesDescription;
