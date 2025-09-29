import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_AVAILABLE_FILTERS } from "api/restapi/actionTypes";
import ConnectCloudAccount from "components/ConnectCloudAccount";
import { CREATE_DATA_SOURCE as APOLLO_CREATE_DATA_SOURCE, GET_DATA_SOURCES } from "graphql/api/restapi/queries/restapi.queries";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { useRefetchApis } from "hooks/useRefetchApis";
import { CLOUD_ACCOUNTS } from "urls";
import { trackEvent, GA_EVENT_CATEGORIES } from "utils/analytics";
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
import type { Config, Params } from "./types";

const ConnectCloudAccountContainer = () => {
  const { organizationId } = useOrganizationInfo();

  const refetch = useRefetchApis();

  const navigate = useNavigate();

  const [createDataSource, { loading }] = useMutation(APOLLO_CREATE_DATA_SOURCE);

  const redirectToCloudsOverview = () => navigate(CLOUD_ACCOUNTS);

  const getAwsConfigName = (config: Config) => {
    if (config.linked) {
      return "awsLinkedConfig";
    }

    if (config.assume_role_account_id && config.assume_role_name) {
      return "awsAssumedRoleConfig";
    }

    return "awsRootConfig";
  };

  const onSubmit = ({ name, config, type }: Params) => {
    const configName = {
      [AWS_CNR]: getAwsConfigName(config),
      [AZURE_TENANT]: "azureTenantConfig",
      [AZURE_CNR]: "azureSubscriptionConfig",
      [GCP_CNR]: "gcpConfig",
      [GCP_TENANT]: "gcpTenantConfig",
      [ALIBABA_CNR]: "alibabaConfig",
      [NEBIUS]: "nebiusConfig",
      [DATABRICKS]: "databricksConfig",
      [KUBERNETES_CNR]: "k8sConfig"
    }[type];

    trackEvent({ category: GA_EVENT_CATEGORIES.DATA_SOURCE, action: "Try connect", label: type });

    createDataSource({
      variables: {
        organizationId,
        params: {
          name,
          type,
          [configName]: config
        }
      },
      refetchQueries: [GET_DATA_SOURCES]
    }).then(() => {
      refetch([GET_AVAILABLE_FILTERS]);
      redirectToCloudsOverview();
    });
  };

  return <ConnectCloudAccount isLoading={loading} onSubmit={onSubmit} onCancel={redirectToCloudsOverview} />;
};

export default ConnectCloudAccountContainer;
