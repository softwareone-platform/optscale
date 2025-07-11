import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { TAGS_RELATED_FILTERS } from "components/Filters/constants";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import { FILTER_CONFIGS } from "components/Resources/filterConfigs";
import { ANOMALY_TYPES, EXPIRING_BUDGET_POLICY, QUOTA_POLICY, RECURRING_BUDGET_POLICY, TAGGING_POLICY } from "utils/constants";
import DividerHorizontal from "../../shared/components/DividerHorizontal/DividerHorizontal";
import { MPT_SPACING_3 } from "../../utils/layouts";
import { CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES } from "./constants";
import {
  NameInput,
  TypeSelector,
  EvaluationPeriodInput,
  ThresholdInput,
  CancelButton,
  Filters,
  SubmitButton,
  MonthlyBudgetInput,
  TotalBudgetInput,
  MaxValueInput,
  StartDatePicker,
  TagsInputs,
  TYPE_REQUIRED
} from "./FormElements";

const CreateOrganizationConstraintForm = ({ onSubmit, types, navigateAway }) => {
  const methods = useForm({
    defaultValues: {
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.FILTERS]: Object.fromEntries(
        Object.values(FILTER_CONFIGS).map((filterConfig) => {
          const { id, getDefaultValue } = filterConfig;

          return [id, getDefaultValue()];
        })
      ),
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.EVALUATION_PERIOD]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.NAME]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.THRESHOLD]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.TYPE]: types.length === 1 ? types[0] : "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.MAX_VALUE]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.MONTHLY_BUDGET]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.TOTAL_BUDGET]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.START_DATE]: +new Date(),
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.TAGS_BAR]: TYPE_REQUIRED,
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.REQUIRED_TAG]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.PROHIBITED_TAG]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.CORRELATION_TAG_1]: "",
      [CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.CORRELATION_TAG_2]: ""
    }
  });
  const { handleSubmit, watch } = methods;

  const typeSelected = watch(CREATE_ORGANIZATION_CONSTRAINT_FORM_FIELD_NAMES.TYPE);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Box sx={{ width: { md: "50%" } }}>
          <NameInput />
          {types.length > 1 && <TypeSelector types={types} />}
          {ANOMALY_TYPES[typeSelected] && (
            <>
              <DividerHorizontal verticalSpacing={MPT_SPACING_3} noHorizontalSpacing />
              <EvaluationPeriodInput />
              <ThresholdInput />
            </>
          )}
          {typeSelected === RECURRING_BUDGET_POLICY && (
            <>
              <DividerHorizontal verticalSpacing={MPT_SPACING_3} noHorizontalSpacing />
              <MonthlyBudgetInput />
            </>
          )}
          {typeSelected === EXPIRING_BUDGET_POLICY && (
            <>
              <DividerHorizontal verticalSpacing={MPT_SPACING_3} noHorizontalSpacing />
              <TotalBudgetInput />
            </>
          )}
          {(typeSelected === EXPIRING_BUDGET_POLICY || typeSelected === TAGGING_POLICY) && <StartDatePicker />}
        </Box>
        <DividerHorizontal verticalSpacing={MPT_SPACING_3} noHorizontalSpacing />
        <Box sx={{ width: { md: "50%", marginBottom: MPT_SPACING_3 } }}>
          {typeSelected === QUOTA_POLICY && <MaxValueInput />}
          {typeSelected === TAGGING_POLICY && <TagsInputs />}
        </Box>
        <Filters exceptions={typeSelected === TAGGING_POLICY ? TAGS_RELATED_FILTERS : undefined} />
        <FormButtonsWrapper>
          <SubmitButton />
          <CancelButton navigateAway={navigateAway} />
        </FormButtonsWrapper>
      </form>
    </FormProvider>
  );
};

export default CreateOrganizationConstraintForm;
