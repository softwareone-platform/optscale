import { useEffect } from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import { useForm, FormProvider } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import QuestionMark from "components/QuestionMark";
import { ActiveCheckboxField, ConditionsFieldArray, FormButtons, NameField, OwnerSelector, PoolSelector } from "./FormElements";
import { FormValues } from "./types";
import { FIELD_NAMES } from "./utils";

const AssignmentRuleForm = ({
  onSubmit,
  onCancel,
  pools,
  cloudAccounts,
  resourceTypes,
  regions,
  isEdit = false,
  onPoolChange,
  poolOwners,
  defaultValues,
  isLoadingProps = {}
}) => {
  const methods = useForm<FormValues>({
    // We need to pass defaultValues to useForm in order to reset the Controller components' value.
    // (defaultValues.poolId, defaultValues.ownerId are marked as required in the propTypes definition)
    // see https://react-hook-form.com/api#reset
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onFormSubmit = (formData: FormValues) => {
    const getConditions = () => {
      const {
        FIELD_NAME,
        META_INFO,
        TYPE,
        TAG_KEY_FIELD_NAME,
        TAG_VALUE_FIELD_NAME,
        CLOUD_IS_FIELD_NAME,
        RESOURCE_TYPE_IS_FIELD_NAME,
        REGION_IS_FIELD_NAME
      } = FIELD_NAMES.CONDITIONS_FIELD_ARRAY;

      return formData[FIELD_NAME].map((item) => {
        if (TAG_KEY_FIELD_NAME in item) {
          return {
            [META_INFO]: JSON.stringify({
              key: item[TAG_KEY_FIELD_NAME].trim(),
              value: item[TAG_VALUE_FIELD_NAME].trim()
            }),
            [TYPE]: item[TYPE]
          };
        }
        if (CLOUD_IS_FIELD_NAME in item) {
          return {
            [META_INFO]: item[CLOUD_IS_FIELD_NAME].trim(),
            [TYPE]: item[TYPE]
          };
        }
        if (RESOURCE_TYPE_IS_FIELD_NAME in item) {
          return {
            [META_INFO]: item[RESOURCE_TYPE_IS_FIELD_NAME].trim(),
            [TYPE]: item[TYPE]
          };
        }
        if (REGION_IS_FIELD_NAME in item) {
          const { regionName } = item[REGION_IS_FIELD_NAME];

          return {
            [META_INFO]: regionName === null ? null : regionName.trim(),
            [TYPE]: item[TYPE]
          };
        }

        return { ...item, meta_info: item[META_INFO].trim() };
      });
    };

    const modifiedData = {
      ...formData,
      conditions: getConditions()
    };

    onSubmit(modifiedData);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit((formData) => {
          onFormSubmit(formData);
        })}
        noValidate
        data-test-id="add_rule_form"
      >
        <ActiveCheckboxField isLoading={isLoadingProps.isActiveCheckboxLoading} />
        <NameField isLoading={isLoadingProps.isNameInputLoading} />
        <Box display="flex" alignItems="center">
          <FormLabel data-test-id="lbl_conditions" required component="p">
            <FormattedMessage id="conditions" />
          </FormLabel>
          <QuestionMark dataTestId="conditions_help" messageId="assignmentRuleConditionsDescription" fontSize="small" />
        </Box>
        <ConditionsFieldArray
          isLoading={isLoadingProps.isConditionsFieldLoading}
          cloudAccounts={cloudAccounts}
          resourceTypes={resourceTypes}
          regions={regions}
        />
        <FormLabel data-test-id="lbl_assign" component="p">
          <FormattedMessage id="assignTo" />
        </FormLabel>
        <PoolSelector pools={pools} onPoolChange={onPoolChange} isLoading={isLoadingProps.isPoolSelectorLoading} />
        <OwnerSelector poolOwners={poolOwners} pools={pools} isFormDataLoading={isLoadingProps.isOwnerSelectorLoading} />
        <FormButtons isLoading={isLoadingProps.isSubmitButtonLoading} isEdit={isEdit} onCancel={onCancel} />
      </form>
    </FormProvider>
  );
};

export default AssignmentRuleForm;
