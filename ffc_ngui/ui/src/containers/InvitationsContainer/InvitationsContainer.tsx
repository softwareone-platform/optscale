import { NetworkStatus, useLazyQuery, useQuery } from "@apollo/client";
import Invitations from "components/Invitations";
import { GET_INVITATIONS, GET_ORGANIZATIONS } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

const InvitationsContainer = () => {
  const { organizationId } = useOrganizationInfo();

  const {
    data: { invitations = [] } = {},
    networkStatus,
    refetch: refetchInvitations
  } = useQuery(GET_INVITATIONS, {
    variables: {
      organizationId
    },
    notifyOnNetworkStatusChange: true
  });

  const [getOrganizations] = useLazyQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "network-only"
  });

  const isLoading = networkStatus === NetworkStatus.loading || networkStatus === NetworkStatus.refetch;

  const onSuccess = () => {
    refetchInvitations();
    getOrganizations();
  };

  return (
    <Invitations invitations={invitations} isLoading={isLoading} onSuccessAccept={onSuccess} onSuccessDecline={onSuccess} />
  );
};

export default InvitationsContainer;
