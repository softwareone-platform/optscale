import { useMutation } from "@apollo/client";
import { Box, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import CapabilityField from "components/CapabilityField";
import PageTitle from "components/PageTitle";
import SubmitButtonLoader from "components/SubmitButtonLoader";
import { UPDATE_OPTSCALE_CAPABILITY } from "graphql/api/restapi/queries";

const FIELD_NAMES = Object.freeze({
  CAPABILITY: "capability",
  CAPABILITY_ML: "mlops",
  CAPABILITY_FIN: "finops"
});

type FormValues = {
  [FIELD_NAMES.CAPABILITY]: {
    [FIELD_NAMES.CAPABILITY_ML]: boolean;
    [FIELD_NAMES.CAPABILITY_FIN]: boolean;
  };
};

const getDefaultValues = (): FormValues => ({
  [FIELD_NAMES.CAPABILITY]: {
    [FIELD_NAMES.CAPABILITY_ML]: true,
    [FIELD_NAMES.CAPABILITY_FIN]: true
  }
});

type SetupCapabilityProps = {
  organizationId: string;
  onSuccess: () => void;
  onError: () => void;
};

const SetupCapability = ({ organizationId, onSuccess, onError }: SetupCapabilityProps) => {
  const methods = useForm<FormValues>({
    defaultValues: getDefaultValues()
  });

  const { handleSubmit } = methods;

  const [updateOptscaleCapabilityMutation, { loading: updateOptscaleCapabilityLoading }] = useMutation(
    UPDATE_OPTSCALE_CAPABILITY,
    {
      onError,
      onCompleted: onSuccess
    }
  );

  const onSubmit = async (formData: FormValues) => {
    await updateOptscaleCapabilityMutation({
      variables: {
        organizationId,
        value: formData[FIELD_NAMES.CAPABILITY]
      }
    });
  };

  return (
    <>
      <Box px={2}>
        <PageTitle dataTestId="p_setup_title-demo" align="center">
          <FormattedMessage id="whichOptscaleCapabilitiesAreYouLookingFor" />
        </PageTitle>
      </Box>
      <FormProvider {...methods}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flexDirection="column" alignItems="center" px={4}>
            <CapabilityField
              fieldNames={{
                capability: FIELD_NAMES.CAPABILITY,
                capabilityMl: FIELD_NAMES.CAPABILITY_ML,
                capabilityFin: FIELD_NAMES.CAPABILITY_FIN
              }}
            />
            <Typography align="center" variant="body1" sx={{ my: 3 }}>
              <FormattedMessage id="youCanChangeCapabilityInSettings" />
            </Typography>
            <SubmitButtonLoader messageId="next" size="medium" isLoading={updateOptscaleCapabilityLoading} />
          </Box>
        </form>
      </FormProvider>
    </>
  );
};

export default SetupCapability;
