import { useMemo } from "react";
import { AWS_CNR } from "utils/constants";
import { useAllDataSources } from "./coreData/useAllDataSources";

export const useAwsDataSources = () => {
  const dataSources = useAllDataSources();

  return useMemo(() => dataSources.filter(({ type }) => type === AWS_CNR), [dataSources]);
};
