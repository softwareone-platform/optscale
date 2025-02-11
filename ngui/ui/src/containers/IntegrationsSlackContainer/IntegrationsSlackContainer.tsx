import { useQuery } from "@apollo/client";
import Slack from "components/Integrations/Slack";
import { GET_INSTALLATION_PATH } from "graphql/api/slacker/queries";
import { useCurrentEmployee } from "hooks/coreData/useCurrentEmployee";
import EmployeesService from "services/EmployeesService";

const IntegrationsSlackContainer = () => {
  const { useGet: useGetEmployees } = EmployeesService();
  const { isLoading: isGetEmployeesLoading, employees } = useGetEmployees();

  const { loading: isGetSlackInstallationPathLoading, data } = useQuery(GET_INSTALLATION_PATH);

  const { slack_connected: isCurrentEmployeeConnectedToSlack = false } = useCurrentEmployee();

  return (
    <Slack
      totalEmployees={employees.length}
      connectedEmployees={employees.filter((el) => el.slack_connected).length}
      isCurrentEmployeeConnectedToSlack={isCurrentEmployeeConnectedToSlack}
      slackInstallationPath={data?.url}
      isLoadingProps={{ isGetEmployeesLoading, isGetSlackInstallationPathLoading }}
    />
  );
};

export default IntegrationsSlackContainer;
