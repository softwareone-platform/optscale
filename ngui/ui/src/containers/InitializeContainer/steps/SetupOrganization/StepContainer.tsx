import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_ORGANIZATIONS } from "graphql/api/restapi/queries";
import { useGetToken } from "hooks/useGetToken";
import { isEmpty as isEmptyArray } from "utils/arrays";
import { Error, Loading } from "../../common";
import ProceedToApplication from "../ProceedToApplication";
import SetupOrganization from "./SetupOrganization";

const StepContainer = () => {
  const { userEmail } = useGetToken();

  const {
    data: organizations,
    networkStatus: getOrganizationsNetworkStatus,
    error: getOrganizationsError,
    refetch: refetchOrganizations
  } = useQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true
  });

  const getOrganizationsLoading = getOrganizationsNetworkStatus === NetworkStatus.loading;
  const getOrganizationsRefetching = getOrganizationsNetworkStatus === NetworkStatus.refetch;

  if (getOrganizationsLoading) {
    return <Loading />;
  }

  if (getOrganizationsError) {
    return <Error />;
  }

  const hasOrganizations = !isEmptyArray(organizations?.organizations ?? []);

  if (!hasOrganizations) {
    return (
      <SetupOrganization
        userEmail={userEmail}
        refetchOrganizations={refetchOrganizations}
        isLoading={{
          getOrganizationsLoading: getOrganizationsRefetching
        }}
      />
    );
  }

  return <ProceedToApplication />;
};

export default StepContainer;
