import { useMutation } from "@apollo/client";
import CapabilityForm from "components/forms/CapabilityForm";
import { GET_OPTSCALE_CAPABILITY, UPDATE_OPTSCALE_CAPABILITY } from "graphql/api/restapi/queries";
import { useGetOptscaleCapability } from "hooks/coreData/useGetOptscaleCapability";
import { useIsAllowed } from "hooks/useAllowedActions";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

const CapabilityContainer = () => {
  const { organizationId } = useOrganizationInfo();
  const { optscaleCapability } = useGetOptscaleCapability();

  const [updateOptscaleCapabilityMutation, { loading }] = useMutation(UPDATE_OPTSCALE_CAPABILITY, {
    update: (cache, { data: { updateOptscaleCapability } }) => {
      const { optscaleCapability: cacheOptscaleCapability } = cache.readQuery({
        query: GET_OPTSCALE_CAPABILITY,
        variables: { organizationId }
      });
      cache.writeQuery({
        query: GET_OPTSCALE_CAPABILITY,
        variables: { organizationId },
        data: {
          optscaleCapability: {
            ...cacheOptscaleCapability,
            ...updateOptscaleCapability
          }
        }
      });
    }
  });

  const onApply = (option) => {
    updateOptscaleCapabilityMutation({ variables: { organizationId, value: option } });
  };

  const isApplyCapabilityAllowed = useIsAllowed({ requiredActions: ["EDIT_PARTNER"] });

  return (
    <CapabilityForm
      isLoading={loading}
      option={optscaleCapability}
      onApply={onApply}
      isApplyAllowed={isApplyCapabilityAllowed}
    />
  );
};

export default CapabilityContainer;
