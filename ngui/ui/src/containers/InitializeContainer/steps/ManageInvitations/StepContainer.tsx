import { useState } from "react";
import { useInvitationsQuery } from "graphql/__generated__/hooks/restapi";
import { isEmptyArray } from "utils/arrays";
import { ALLOW_ORGANIZATION_CREATION } from "utils/constants";
import { Error, Loading } from "../../common";
import ProceedToApplication from "../ProceedToApplication";
import SetupOrganization from "../SetupOrganization/StepContainer";
import AcceptInvitations from "./AcceptInvitations";

const StepContainer = () => {
  const [proceedToNext, setProceedToNext] = useState(false);
  const {
    data: invitations,
    loading: isLoading,
    error: error,
    refetch: refetchInvitations
  } = useInvitationsQuery({
    fetchPolicy: "network-only"
  });

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
