import { useQuery } from "@apollo/client";
import OrganizationSelector from "components/OrganizationSelector";
import { GET_ORGANIZATIONS } from "graphql/api/restapi/queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { useUpdateScope } from "hooks/useUpdateScope";
import { HOME } from "urls";

const OrganizationSelectorContainer = () => {
  const { data: { organizations = [] } = {} } = useQuery(GET_ORGANIZATIONS, {
    fetchPolicy: "cache-only"
  });

  const { organizationId } = useOrganizationInfo();

  const updateScope = useUpdateScope();

  const handleScopeChange = (scopeId: string) => {
    updateScope({
      newScopeId: scopeId,
      redirectTo: HOME
    });
  };

  return <OrganizationSelector organizations={organizations} organizationId={organizationId} onChange={handleScopeChange} />;
};

export default OrganizationSelectorContainer;
