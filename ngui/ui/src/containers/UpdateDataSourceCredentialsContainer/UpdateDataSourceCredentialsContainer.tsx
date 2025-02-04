import { useMutation } from "@apollo/client";
import { GET_AVAILABLE_FILTERS } from "api/restapi/actionTypes";
import UpdateDataSourceCredentialsForm from "components/forms/UpdateDataSourceCredentialsForm";
import { UPDATE_DATA_SOURCE } from "graphql/api/restapi/queries/restapi.queries";
import { useRefetchApis } from "hooks/useRefetchApis";
import {
  ALIBABA_CNR,
  AWS_CNR,
  AZURE_CNR,
  AZURE_TENANT,
  DATABRICKS,
  GCP_CNR,
  GCP_TENANT,
  KUBERNETES_CNR,
  NEBIUS
} from "utils/constants";

const UpdateDataSourceCredentialsContainer = ({ id, type, config, closeSideModal }) => {
  const refetch = useRefetchApis();

  const [updateDataSource, { loading }] = useMutation(UPDATE_DATA_SOURCE);

  const onSubmit = (dataSourceId, { config: newConfig }) => {
    const configName = {
      [AWS_CNR]: newConfig.linked ? "awsLinkedConfig" : "awsRootConfig",
      [AZURE_TENANT]: "azureTenantConfig",
      [AZURE_CNR]: "azureSubscriptionConfig",
      [GCP_CNR]: "gcpConfig",
      [GCP_TENANT]: "gcpTenantConfig",
      [ALIBABA_CNR]: "alibabaConfig",
      [NEBIUS]: "nebiusConfig",
      [DATABRICKS]: "databricksConfig",
      [KUBERNETES_CNR]: "k8sConfig"
    }[type];

    updateDataSource({
      variables: {
        dataSourceId,
        params: {
          [configName]: newConfig
        }
      }
    }).then(() => {
      refetch([GET_AVAILABLE_FILTERS]);
      closeSideModal();
    });
  };

  return (
    <UpdateDataSourceCredentialsForm
      id={id}
      type={type}
      config={config}
      onSubmit={onSubmit}
      onCancel={closeSideModal}
      isLoading={loading}
    />
  );
};

export default UpdateDataSourceCredentialsContainer;
