import Jira from "components/Integrations/Jira";
import { useCurrentEmployee } from "hooks/coreData";
import EmployeesService from "services/EmployeesService";
import JiraOrganizationStatusService from "services/JiraOrganizationStatusService";

const IntegrationJiraContainer = () => {
  const { useGet: useGetEmployees } = EmployeesService();
  const { isLoading: isGetEmployeesLoading, employees } = useGetEmployees();

  const { useGet: useGetJiraOrganizationStatus } = JiraOrganizationStatusService();
  const { isLoading: isGetJiraOrganizationStatusLoading, connectedTenants } = useGetJiraOrganizationStatus();

  const { jira_connected: isCurrentEmployeeConnectedToJira = false } = useCurrentEmployee();

  return (
    <Jira
      totalEmployees={employees.length}
      connectedEmployees={employees.filter((el) => el.jira_connected).length}
      connectedWorkspaces={connectedTenants}
      isCurrentEmployeeConnectedToJira={isCurrentEmployeeConnectedToJira}
      isLoadingProps={{ isGetEmployeesLoading, isGetJiraOrganizationStatusLoading }}
    />
  );
};

export default IntegrationJiraContainer;
