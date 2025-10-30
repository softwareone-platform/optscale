import { useState } from "react";
import { NetworkStatus } from "@apollo/client";
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
    networkStatus: getInvitationsNetworkStatus,
    error: getInvitationsError,
    refetch: refetchInvitations
  } = useInvitationsQuery({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true
  });

  const onRefetch = ({ onSuccess, onError } = {}) => {
    refetchInvitations()
      .then((queryResult) => {
        if (typeof onSuccess === "function") {
          onSuccess(queryResult);
        }
      })
      .catch((error) => {
        if (typeof onError === "function") {
          onError(error);
        }
      })
      .finally(() => {
        setProceedToNext(false);
      });
  };

  const getInvitationsLoading = getInvitationsNetworkStatus === NetworkStatus.loading;
  const getInvitationsRefetching = getInvitationsNetworkStatus === NetworkStatus.refetch;

  const error = getInvitationsError;

  if (getInvitationsLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (proceedToNext) {
    return ALLOW_ORGANIZATION_CREATION ? (
      <SetupOrganization isInvitationsRefetching={getInvitationsRefetching} refetchInvitations={onRefetch} />
    ) : (
      <ProceedToApplication />
    );
  }

  const hasInvitations = !isEmptyArray(invitations?.invitations ?? []);

  if (hasInvitations) {
    return (
      <AcceptInvitations
        invitations={invitations?.invitations ?? []}
        refetchInvitations={onRefetch}
        onProceed={() => {
          setProceedToNext(true);
        }}
      />
    );
  }

  return ALLOW_ORGANIZATION_CREATION ? (
    <SetupOrganization isInvitationsRefetching={getInvitationsRefetching} refetchInvitations={onRefetch} />
  ) : (
    <ProceedToApplication />
  );
};

export default StepContainer;
