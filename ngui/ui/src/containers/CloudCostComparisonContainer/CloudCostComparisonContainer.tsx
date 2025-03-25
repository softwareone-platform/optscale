import { useCallback } from "react";
import { useLazyQuery } from "@apollo/client";
import CloudCostComparison from "components/CloudCostComparison";
import { FIELD_NAMES, SUPPORTED_CLOUD_TYPES } from "components/forms/CloudCostComparisonFiltersForm/constants";
import { FormValues } from "components/forms/CloudCostComparisonFiltersForm/types";
import { GET_RELEVANT_FLAVORS } from "graphql/api/restapi/queries/restapi.queries";
import { useIsNebiusConnectionEnabled } from "hooks/useIsNebiusConnectionEnabled";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { isEmpty } from "utils/arrays";
import { NEBIUS } from "utils/constants";
import { updateQueryParams } from "utils/network";

const CloudCostComparisonContainer = () => {
  const { organizationId } = useOrganizationInfo();

  const isNebiusConnectionEnabled = useIsNebiusConnectionEnabled();

  const getApiParams = useCallback(
    (params: FormValues) => {
      const getCloudType = () => {
        const cloudTypes = SUPPORTED_CLOUD_TYPES.map(({ type }) => type);

        const allowedTypes = cloudTypes.filter((type) => {
          if (type === NEBIUS && !isNebiusConnectionEnabled) {
            return false;
          }
          return true;
        });

        if (isEmpty(params[FIELD_NAMES.CLOUD_PROVIDER])) {
          return allowedTypes;
        }
        return allowedTypes.filter((type) => params[FIELD_NAMES.CLOUD_PROVIDER].includes(type));
      };

      return {
        cloud_type: getCloudType(),
        min_cpu: params[FIELD_NAMES.MIN_CPU].trim(),
        max_cpu: params[FIELD_NAMES.MAX_CPU].trim(),
        min_ram: params[FIELD_NAMES.MIN_RAM].trim(),
        max_ram: params[FIELD_NAMES.MAX_RAM].trim(),
        region: params[FIELD_NAMES.REGION],
        preferred_currency: params[FIELD_NAMES.CURRENCY_CODE]
      };
    },
    [isNebiusConnectionEnabled]
  );

  const [getRelevantFlavors, { loading: isLoading, data: { relevantFlavors: { flavors, errors } = {} } = {} }] =
    useLazyQuery(GET_RELEVANT_FLAVORS);

  return (
    <CloudCostComparison
      onFiltersApply={(newParams: FormValues) => {
        updateQueryParams(newParams);
        getRelevantFlavors({
          variables: {
            organizationId: organizationId,
            requestParams: getApiParams(newParams)
          },
          fetchPolicy: "no-cache"
        });
      }}
      relevantSizes={flavors}
      errors={errors}
      isLoading={isLoading}
    />
  );
};

export default CloudCostComparisonContainer;
