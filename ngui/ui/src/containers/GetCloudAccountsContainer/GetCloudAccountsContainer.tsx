import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPool } from "api";
import { GET_POOL } from "api/restapi/actionTypes";
import CloudAccountsOverview from "components/CloudAccountsOverview";
import { useAllDataSources } from "hooks/coreData";
import { useApiData } from "hooks/useApiData";
import { useApiState } from "hooks/useApiState";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

const GetCloudAccountsContainer = () => {
  const dataSources = useAllDataSources();

  const { organizationPoolId } = useOrganizationInfo();

  const dispatch = useDispatch();

  const {
    apiData: { pool: { limit: organizationLimit = 0 } = {} }
  } = useApiData(GET_POOL);

  const { isLoading: isGetPoolLoading, shouldInvoke: shouldInvokeGetPool } = useApiState(GET_POOL, {
    poolId: organizationPoolId
  });

  useEffect(() => {
    if (organizationPoolId && shouldInvokeGetPool) {
      dispatch(getPool(organizationPoolId));
    }
  }, [shouldInvokeGetPool, dispatch, organizationPoolId]);

  return (
    <CloudAccountsOverview isLoading={isGetPoolLoading} cloudAccounts={dataSources} organizationLimit={organizationLimit} />
  );
};

export default GetCloudAccountsContainer;
