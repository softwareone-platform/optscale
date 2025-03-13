import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_INVITATIONS } from "graphql/api/restapi/queries";
import { isEmpty as isEmptyArray } from "utils/arrays";
import { ALLOW_ORGANIZATION_CREATION } from "utils/constants";
import { Error, Loading } from "../../common";
import SetupOrganization from "../SetupOrganization/StepContainer";
import AcceptInvitations from "./AcceptInvitations";
import ProceedToApplication from "../ProceedToApplication";

const StepContainer = () => {
  const [proceedToNext, setProceedToNext] = useState(false);

  const {
    data: invitations,
    loading: getInvitationsLoading,
    error: getInvitationsError,
    refetch: refetchInvitations
  } = useQuery(GET_INVITATIONS, {
    fetchPolicy: "network-only"
  });

  const isLoading = getInvitationsLoading;

  const error = getInvitationsError;

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (proceedToNext) {
    return ALLOW_ORGANIZATION_CREATION ? <SetupOrganization /> : <ProceedToApplication />;
  }

  const hasInvitations = !isEmptyArray(invitations?.invitations ?? []);

  if (hasInvitations) {
    return (
      <AcceptInvitations
        invitations={invitations?.invitations ?? []}
        refetchInvitations={refetchInvitations}
        onProceed={() => {
          setProceedToNext(true);
        }}
      />
    );
  }

  return ALLOW_ORGANIZATION_CREATION ? <SetupOrganization /> : <ProceedToApplication />;
};

export default StepContainer;
