import { useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { Skeleton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import ActionBar from "components/ActionBar";
import AnomaliesFilters from "components/AnomaliesFilters";
import DetectedConstraintsHistory from "components/DetectedConstraintsHistory";
import FormattedMoney from "components/FormattedMoney";
import IconButton from "components/IconButton";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import PageContentWrapper from "components/PageContentWrapper";
import { DeleteOrganizationConstraintModal } from "components/SideModalManager/SideModals";
import EditOrganizationConstraintNameFormContainer from "containers/EditOrganizationConstraintNameFormContainer";
import { useIsAllowed } from "hooks/useAllowedActions";
import { useOpenSideModal } from "hooks/useOpenSideModal";
import { useOrganizationActionRestrictions } from "hooks/useOrganizationActionRestrictions";
import {
  ANOMALY_TYPES,
  EXPIRING_BUDGET_POLICY,
  QUOTAS_AND_BUDGETS_TYPES,
  QUOTA_POLICY,
  RECURRING_BUDGET_POLICY,
  TAGGING_POLICY,
  TAGGING_POLICY_TYPES
} from "utils/constants";
import { EN_FULL_FORMAT, format, secondsToMilliseconds } from "utils/datetime";
import { isEmptyObject } from "utils/objects";
import { getResourcesLink } from "utils/organizationConstraints/getResourcesLink";
import LabelColon from "../../shared/components/LabelColon/LabelColon";
import { MPT_SPACING_2, SPACING_2 } from "../../utils/layouts";
import SlicedText from "../SlicedText";
import BreakdownChart from "./BreakdownChart";
import TaggingPolicyDescriptionShort from "./TaggingPolicyDescriptionShort";

const ConstraintName = ({ id, name }) => {
  const { isRestricted, restrictionReasonMessage } = useOrganizationActionRestrictions();

  const [isEditMode, setIsEditMode] = useState(false);
  const openEditMode = () => setIsEditMode(true);
  const closeEditMode = () => setIsEditMode(false);

  const isAllowed = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

  return isEditMode ? (
    <EditOrganizationConstraintNameFormContainer id={id} name={name} onSuccess={closeEditMode} onCancel={closeEditMode} />
  ) : (
    <Box display="flex" alignItems="center">
      <KeyValueLabel
        keyMessageId="name"
        variant="property"
        value={<SlicedText limit={80} text={name} />}
        sx={{
          marginRight: 1
        }}
      />
      {id && name && isAllowed ? (
        <IconButton
          key="edit"
          icon={<EditOutlinedIcon />}
          onClick={openEditMode}
          disabled={isRestricted}
          tooltip={{
            show: true,
            value: isRestricted ? restrictionReasonMessage : <FormattedMessage id="edit" />
          }}
        />
      ) : null}
    </Box>
  );
};

const ConstraintProperties = ({ id, name, type, definition = {} }) => {
  if (!type) {
    // Means constraint is not loaded: parent component using "isLoading" (using isDataReady leads to old data flickering)
    // TODO: Convenient loading strategy
    return null;
  }

  const {
    threshold_days: evaluationPeriod,
    threshold,
    max_value: maxValue,
    monthly_budget: monthlyBudget,
    total_budget: totalBudget,
    start_date: startDate,
    conditions
  } = definition;

  return (
    <>
      <ConstraintName id={id} name={name} />
      {!TAGGING_POLICY_TYPES[type] && (
        <KeyValueLabel
          keyMessageId="type"
          variant="property"
          value={<FormattedMessage id={ANOMALY_TYPES[type] || QUOTAS_AND_BUDGETS_TYPES[type]} />}
          gutterBottom
        />
      )}
      {ANOMALY_TYPES[type] && (
        <KeyValueLabel
          keyMessageId="evaluationPeriod"
          variant="property"
          value={<FormattedMessage id="xDays" values={{ x: evaluationPeriod }} />}
          gutterBottom
        />
      )}
      {ANOMALY_TYPES[type] && (
        <KeyValueLabel
          keyMessageId="threshold"
          variant="property"
          value={<FormattedNumber value={threshold / 100} format="percentage" />}
          gutterBottom
        />
      )}
      {type === QUOTA_POLICY && (
        <KeyValueLabel
          keyMessageId="quotaPolicyMaxValue"
          variant="property"
          value={<FormattedNumber value={maxValue} />}
          gutterBottom
        />
      )}
      {type === RECURRING_BUDGET_POLICY && (
        <KeyValueLabel
          keyMessageId="recurringBudgetPolicyMonthlyBudget"
          variant="property"
          value={<FormattedMoney value={monthlyBudget} />}
          gutterBottom
        />
      )}
      {(type === EXPIRING_BUDGET_POLICY || type === TAGGING_POLICY) && (
        <KeyValueLabel
          keyMessageId="startDate"
          variant="property"
          value={format(secondsToMilliseconds(startDate), EN_FULL_FORMAT)}
          gutterBottom
        />
      )}
      {type === EXPIRING_BUDGET_POLICY && (
        <KeyValueLabel keyMessageId="budget" variant="property" value={<FormattedMoney value={totalBudget} />} gutterBottom />
      )}
      {type === TAGGING_POLICY && (
        <Typography component="div" sx={{ marginTop: MPT_SPACING_2 }}>
          <TaggingPolicyDescriptionShort conditions={conditions} />
        </Typography>
      )}
    </>
  );
};

const FiltersSection = ({ filters = {}, isLoading = false }) => (
  <>
    <Typography variant="subtitle1" component="div" sx={{ marginTop: MPT_SPACING_2 }}>
      <LabelColon messageId="filters" />
    </Typography>
    {isLoading ? <Skeleton height={80} /> : <AnomaliesFilters filters={filters} showAll />}
  </>
);

const OrganizationConstraint = ({
  actionBarBreadcrumbsDefinition,
  actionBarTitleDefinition,
  constraint,
  limitHits,
  isLoadingProps = {}
}) => {
  const { anomalyId } = useParams();

  const navigate = useNavigate();

  const openSideModal = useOpenSideModal();

  const { isGetConstraintLoading = false, isGetLimitHitsLoading = false } = isLoadingProps;

  const isAllowed = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

  const { id, name, type, definition, filters = {} } = constraint;

  const actionBarDefinition = {
    breadcrumbs: actionBarBreadcrumbsDefinition,
    title: actionBarTitleDefinition,
    items: [
      {
        key: "showResources",
        icon: <ListAltOutlinedIcon fontSize="small" />,
        messageId: "showResources",
        type: "button",
        color: "primary",
        isLoading: isGetConstraintLoading,
        dataTestId: "btn_show_resources",
        action: () => {
          const link = getResourcesLink(constraint);
          navigate(link);
        }
      },
      {
        key: "delete",
        icon: <DeleteOutlinedIcon fontSize="small" />,
        messageId: "delete",
        color: "error",
        type: "button",
        isLoading: isGetConstraintLoading,
        show: isAllowed,
        dataTestId: "btn_delete",
        action: () => openSideModal(DeleteOrganizationConstraintModal, { id, name, type })
      }
    ]
  };

  const renderFiltersSection = () => {
    if (isGetConstraintLoading) {
      return <FiltersSection isLoading />;
    }
    if (isEmptyObject(filters)) {
      return null;
    }
    return <FiltersSection filters={filters} />;
  };

  return (
    <>
      <ActionBar data={actionBarDefinition} />
      <PageContentWrapper>
        <Stack width={"100%"} spacing={SPACING_2}>
          <Box className={"MTPBoxShadow"}>
            <div>
              {isGetConstraintLoading ? (
                <Skeleton width="100%">
                  <ConstraintProperties />
                </Skeleton>
              ) : (
                <ConstraintProperties id={id} name={name} type={type} definition={definition} />
              )}
            </div>
            <div>{renderFiltersSection()}</div>
          </Box>
          {limitHits.length > 0 && (
            <Box className={"MTPBoxShadow"}>
              {anomalyId && <BreakdownChart constraint={constraint} isGetConstraintLoading={isGetConstraintLoading} />}
              <DetectedConstraintsHistory
                constraint={constraint}
                limitHits={limitHits}
                isLoading={isGetConstraintLoading || isGetLimitHitsLoading}
              />
            </Box>
          )}
        </Stack>
      </PageContentWrapper>
    </>
  );
};

export default OrganizationConstraint;
