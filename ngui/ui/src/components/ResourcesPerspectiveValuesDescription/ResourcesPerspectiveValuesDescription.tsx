import { Box, Stack } from "@mui/material";
import { FormattedMessage } from "react-intl";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { breakdowns } from "hooks/useBreakdownBy";
import { isEmpty as isEmptyArray } from "utils/arrays";
import { MPT_SPACING_1, MPT_SPACING_2, SPACING_2 } from "utils/layouts";
import LabelColon from "../../shared/components/LabelColon/LabelColon";

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
  <Stack spacing={SPACING_2} paddingTop={MPT_SPACING_2}>
    <KeyValueLabel keyMessageId="breakdownBy" isBoldKeyLabel value={<FormattedMessage id={breakdownBy} />} />
    {Object.entries(breakdownData)
      .map(([name, value]) => {
        const renderer = getBreakdownStateValueRenderer(name);

        return renderer(value);
      })
      .filter(Boolean)
      .map(({ controlName, renderValue }) => (
        <KeyValueLabel key={controlName} isBoldKeyLabel keyMessageId={controlName} value={renderValue()} />
      ))}
    <Box sx={{ paddingTop: MPT_SPACING_2 }}>
      {isEmptyArray(filters) ? (
        <KeyValueLabel keyMessageId="filters" isBoldKeyLabel value="None" />
      ) : (
        <>
          <Box sx={{ marginBottom: MPT_SPACING_1 }}>
            <LabelColon messageId={"filters"} />
          </Box>
          {filters.map(({ name, displayedName, displayedValue }) => (
            <KeyValueLabel
              key={name}
              sx={{ marginBottom: MPT_SPACING_1 }}
              isBoldKeyLabel
              keyText={displayedName}
              value={displayedValue}
            />
          ))}
        </>
      )}
    </Box>
  </Stack>
);

export default ResourcesPerspectiveValuesDescription;
