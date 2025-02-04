import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Box, CircularProgress } from "@mui/material";
import { FormattedMessage } from "react-intl";
import PageTitle from "components/PageTitle";
import { CREATE_ORGANIZATION } from "graphql/api/restapi/queries/restapi.queries";

const SetupOrganization = ({ userEmail, refetchOrganizations }) => {
  const [createOrganization] = useMutation(CREATE_ORGANIZATION);

  useEffect(() => {
    createOrganization({
      variables: {
        organizationName: `${userEmail}'s Organization`
      }
    }).then(() => refetchOrganizations());
  }, [createOrganization, refetchOrganizations, userEmail]);

  return (
    <>
      <Box pr={2} pl={2}>
        <PageTitle dataTestId="p_initializing" align="center">
          <FormattedMessage id="initializingOptscale" />
        </PageTitle>
      </Box>
      <Box height={60}>
        <CircularProgress data-test-id="svg_loading" />
      </Box>
    </>
  );
};

export default SetupOrganization;
