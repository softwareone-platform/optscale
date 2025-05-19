import { useState } from "react";
import { Box, Link, Stack, Typography } from "@mui/material";
import { FormattedMessage } from "react-intl";
import { Link as RouterLink } from "react-router-dom";
import Button from "components/Button";
import Chip from "components/Chip";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import ResourcesPerspectiveValuesDescription from "components/ResourcesPerspectiveValuesDescription";
import Tooltip from "components/Tooltip";
import { RESOURCE_PERSPECTIVES } from "urls";
import { SPACING_1, SPACING_2 } from "utils/layouts";
import { sliceByLimitWithEllipsis } from "utils/strings";

const PerspectiveDescription = ({ perspective }) => {
  const {
    breakdownBy,
    breakdownData,
    filters: { filterValues, appliedFilters }
  } = perspective;

  return (
    <ResourcesPerspectiveValuesDescription
      breakdownBy={breakdownBy}
      breakdownData={breakdownData}
      perspectiveFilterValues={filterValues}
      perspectiveAppliedFilters={appliedFilters}
    />
  );
};

const MAX_CHIP_LABEL_LENGTH = 50;

const PerspectiveChip = ({ perspectiveName, selectedPerspectiveName, onClick }) => {
  const isNameLong = perspectiveName.length > MAX_CHIP_LABEL_LENGTH;

  return (
    <Chip
      key={perspectiveName}
      variant={selectedPerspectiveName === perspectiveName ? "filled" : "outlined"}
      size="medium"
      onClick={onClick}
      color={selectedPerspectiveName === perspectiveName ? "secondary" : "info"}
      label={
        <Tooltip title={isNameLong ? perspectiveName : undefined}>
          {isNameLong ? sliceByLimitWithEllipsis(perspectiveName, MAX_CHIP_LABEL_LENGTH) : perspectiveName}
        </Tooltip>
      }
    />
  );
};

const ApplyResourcePerspective = ({ perspectives, appliedPerspectiveName, onApply, onCancel }) => {
  const [selectedPerspectiveName, setSelectedPerspectiveName] = useState(appliedPerspectiveName);

  const selectedPerspectiveData = perspectives[selectedPerspectiveName];

  return (
    <Stack spacing={SPACING_2}>
      <Typography>
        <FormattedMessage
          id="selectAndApplyPerspective"
          values={{
            seeAllPerspectivesLink: (
              <Link to={RESOURCE_PERSPECTIVES} component={RouterLink}>
                <FormattedMessage id="seeAllPerspectives" />
              </Link>
            )
          }}
        />
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={SPACING_1}>
        {Object.keys(perspectives).map((perspectiveName) => (
          <PerspectiveChip
            key={perspectiveName}
            perspectiveName={perspectiveName}
            selectedPerspectiveName={selectedPerspectiveName}
            onClick={() => setSelectedPerspectiveName(perspectiveName)}
          />
        ))}
      </Box>
      {selectedPerspectiveName && <PerspectiveDescription perspective={selectedPerspectiveData} />}
      <FormButtonsWrapper>
        <Button
          messageId="apply"
          color="primary"
          variant="contained"
          disabled={!selectedPerspectiveName}
          onClick={() => {
            onApply(selectedPerspectiveName);
            onCancel();
          }}
          dataTestId="btn_apply"
        />
        <Button messageId="cancel" onClick={onCancel} dataTestId="btn_cancel" />
      </FormButtonsWrapper>
    </Stack>
  );
};

export default ApplyResourcePerspective;
