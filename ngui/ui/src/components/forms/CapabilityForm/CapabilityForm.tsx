import { FormProvider, useForm } from "react-hook-form";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import SubmitButtonLoader from "components/SubmitButtonLoader";
import { FIELD_NAMES } from "./constants";
import { CapabilityField } from "./FormElements";
import { CapabilityFormProps, FormValues } from "./types";
import { getDefaultValues } from "./utils";

const CapabilityForm = ({ option, onApply, isLoading = false, isApplyAllowed = false }: CapabilityFormProps) => {
  const methods = useForm<FormValues>({
    defaultValues: getDefaultValues(option)
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: FormValues) => {
    onApply(data[FIELD_NAMES.CAPABILITY]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormProvider {...methods}>
        <CapabilityField />
        {isApplyAllowed && (
          <FormButtonsWrapper>
            <SubmitButtonLoader messageId="apply" isLoading={isLoading} />
          </FormButtonsWrapper>
        )}
      </FormProvider>
    </form>
  );
};

export default CapabilityForm;
