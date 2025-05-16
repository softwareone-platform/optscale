import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import { getResourceUrl } from "urls";
import { RESOURCE_PAGE_TABS, TAB_QUERY_PARAM_NAME } from "utils/constants";
import { getSearchParams, stringifySearchParams } from "utils/network";

const getResourceUrlQueryParameters = (tabName, params) => {
  const tabQueryParameter = {
    [TAB_QUERY_PARAM_NAME]: tabName
  };

  if (tabName === RESOURCE_PAGE_TABS.EXPENSES) {
    const { startDate, endDate } = getSearchParams();
    return stringifySearchParams({ ...tabQueryParameter, ...params, startDate, endDate });
  }

  return stringifySearchParams({ ...tabQueryParameter, ...params });
};

const ResourceLink = ({ resourceId, tabName, children, params, dataTestId }) => {
  const resourceUrl = `${getResourceUrl(resourceId)}?${getResourceUrlQueryParameters(tabName, params)}`;

  return (
    <Link to={resourceUrl} component={RouterLink} data-test-id={dataTestId}>
      {children}
    </Link>
  );
};

// TODO: consider making tabName equal to RESOURCE_PAGE_TABS.DETAILS by default
// it will ease the usage of this component,
// since in most cases we redirect to the Details tab so it would be nice to have it as a default value

export default ResourceLink;
