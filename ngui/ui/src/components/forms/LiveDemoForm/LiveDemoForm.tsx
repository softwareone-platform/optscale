import { FormProvider, useForm } from "react-hook-form";
import Button from "components/Button";
import FormButtonsWrapper from "components/FormButtonsWrapper";
import { EmailField } from "./FormElements";
import { FormValues, LiveDemoFormProps } from "./types";
import { getDefaultValues } from "./utils";

const LiveDemoForm = ({ onSubmit }: LiveDemoFormProps) => {
  const methods = useForm<FormValues>({
    defaultValues: getDefaultValues()
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        style={{
          maxWidth: "430px",
          minWidth: "430px"
        }}
      >
        <EmailField />
        <FormButtonsWrapper mb={1} justifyContent="center">
          <Button
            messageId="proceedToLiveDemo"
            type="submit"
            variant="contained"
            color="primary"
            dataTestId="btn_proceed_to_live_demo"
          />
        </FormButtonsWrapper>
      </form>
    </FormProvider>
  );
};

export default LiveDemoForm;
