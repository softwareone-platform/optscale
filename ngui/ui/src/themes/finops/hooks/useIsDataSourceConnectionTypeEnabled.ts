import { useCallback } from "react";
import { CONNECTION_TYPES } from "@theme/utils/constants";
import { ObjectValues } from "utils/types";

type ConnectionType = ObjectValues<typeof CONNECTION_TYPES>;

export const useIsDataSourceConnectionTypeEnabled = () =>
  useCallback(
    (type: ConnectionType) =>
      ({
        [CONNECTION_TYPES.AWS_MANAGEMENT]: true,
        [CONNECTION_TYPES.AWS_MEMBER]: true,
        [CONNECTION_TYPES.AWS_STANDALONE]: true,
        [CONNECTION_TYPES.AZURE_TENANT]: true,
        [CONNECTION_TYPES.AZURE_SUBSCRIPTION]: true,
        [CONNECTION_TYPES.GCP_TENANT]: true,
        [CONNECTION_TYPES.GCP_PROJECT]: true,
        [CONNECTION_TYPES.ALIBABA]: false,
        [CONNECTION_TYPES.DATABRICKS]: false,
        [CONNECTION_TYPES.KUBERNETES]: false,
        [CONNECTION_TYPES.NEBIUS]: false
      })[type] ?? false,
    []
  );
