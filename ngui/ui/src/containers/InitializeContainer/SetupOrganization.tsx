import { Fragment, useCallback, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormattedMessage } from "react-intl";
import Button from "components/Button";
import CapabilityField from "components/CapabilityField";
import MailTo from "components/MailTo";
import SubmitButtonLoader from "components/SubmitButtonLoader";
import { CREATE_ORGANIZATION, UPDATE_OPTSCALE_CAPABILITY } from "graphql/api/restapi/queries/restapi.queries";
import { useSignOut } from "hooks/useSignOut";
import { EMAIL_SUPPORT } from "urls";
import { Title } from "./Title";

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

type SetupOrganizationProps = {
  userEmail: string;
  refetchOrganizations: () => void;
  isLoading: {
    getOrganizationsLoading: boolean;
  };
};

const getOrganizationName = (userEmail: string) => `${userEmail}'s Organization`;

const SetupOrganization = ({ userEmail, refetchOrganizations, isLoading }: SetupOrganizationProps) => {
  const signOut = useSignOut();

  const [createOrganization, { loading: createOrganizationLoading, error: createOrganizationError }] =
    useMutation(CREATE_ORGANIZATION);
  const [organization, setOrganization] = useState(null);

  const [updateOptscaleCapabilityMutation, { loading: updateOptscaleCapabilityLoading }] =
    useMutation(UPDATE_OPTSCALE_CAPABILITY);

  const methods = useForm<FormValues>({
    defaultValues: getDefaultValues()
  });

  const { handleSubmit } = methods;

  const handleCreateOrganization = useCallback(() => {
    createOrganization({
      variables: {
        organizationName: getOrganizationName(userEmail)
      }
    }).then(({ data }) => {
      setOrganization(data.createOrganization);
    });
  }, [createOrganization, userEmail]);

  useEffect(() => {
    handleCreateOrganization();
  }, [handleCreateOrganization]);

  if (createOrganizationError) {
    return (
      <>
        <Title
          dataTestId="p_organization_creation_failed"
          messageId="organizationCreationFailed"
          messageValues={{
            br: <br />,
            email: <MailTo email={EMAIL_SUPPORT} text={EMAIL_SUPPORT} dataTestId="p_organization_creation_failed_email" />
          }}
        />
        <Box height={60} display="flex" alignItems="center" gap={2}>
          <Button size="medium" messageId="signOut" color="primary" onClick={signOut} />
        </Box>
      </>
    );
  }

  if (!organization) {
    return (
      <>
        <Title dataTestId="p_creating_organization" messageId="creatingOrganization" />
        <Box height={60}>
          <CircularProgress data-test-id="svg_loading" />
        </Box>
      </>
    );
  }

  const onSubmit = async (formData: FormValues) => {
    await updateOptscaleCapabilityMutation({
      variables: {
        organizationId: organization.id,
        value: formData[FIELD_NAMES.CAPABILITY]
      }
    });

    await refetchOrganizations();
  };

  return (
    <>
      <Title dataTestId="p_setup_title" messageId="whichOptscaleCapabilitiesAreYouLookingFor" />
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
            <SubmitButtonLoader
              messageId="next"
              size="medium"
              isLoading={isLoading.getOrganizationsLoading || createOrganizationLoading || updateOptscaleCapabilityLoading}
            />
          </Box>
        </form>
      </FormProvider>
    </>
  );
};

export default SetupOrganization;
