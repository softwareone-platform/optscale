import { Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import InlineSeverityAlert from "components/InlineSeverityAlert";
import { SPACING_1 } from "utils/layouts";
import { FormButtons, ReimportFromDatePicker } from "./FormElements";
import { DataSourceBillingReimportFormProps, FormValues } from "./types";
import { getDefaultValues } from "./utils";

const DataSourceBillingReimportForm = ({ onSubmit, isSubmitLoading = false }: DataSourceBillingReimportFormProps) => {
  const methods = useForm<FormValues>({
    defaultValues: getDefaultValues()
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={SPACING_1}>
          <ReimportFromDatePicker />
          <InlineSeverityAlert messageId="billingReimportWarning" severity="warning" />
        </Stack>
        <FormButtons isLoading={isSubmitLoading} />
      </form>
    </FormProvider>
  );
};

export default DataSourceBillingReimportForm;
