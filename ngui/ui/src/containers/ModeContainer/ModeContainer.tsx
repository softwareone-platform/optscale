import { useMutation } from "@apollo/client";
import Mode from "components/Mode";
import { GET_OPTSCALE_MODE, UPDATE_OPTSCALE_MODE } from "graphql/api/restapi/queries";
import { useGetOptscaleMode } from "hooks/coreData";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

const ModeContainer = () => {
  const { organizationId } = useOrganizationInfo();
  const { optscaleMode } = useGetOptscaleMode();

  const [updateOptscaleModeMutation, { loading }] = useMutation(UPDATE_OPTSCALE_MODE, {
    update: (cache, { data: { updateOptscaleMode } }) => {
      const { optscaleMode: cacheOptscaleMode } = cache.readQuery({ query: GET_OPTSCALE_MODE, variables: { organizationId } });

      cache.writeQuery({
        query: GET_OPTSCALE_MODE,
        variables: { organizationId },
        data: {
          optscaleMode: {
            ...cacheOptscaleMode,
            ...updateOptscaleMode
          }
        }
      });
    }
  });

  const onApply = (option) => {
    updateOptscaleModeMutation({ variables: { organizationId, value: option } });
  };

  return <Mode isLoading={loading} option={optscaleMode} onApply={onApply} />;
};

export default ModeContainer;
