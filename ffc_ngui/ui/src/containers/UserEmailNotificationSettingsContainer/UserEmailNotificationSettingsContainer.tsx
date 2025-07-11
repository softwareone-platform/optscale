import { useQuery } from "@apollo/client";
import UserEmailNotificationSettings from "components/UserEmailNotificationSettings";
import { GET_EMPLOYEE_EMAILS } from "graphql/api/restapi/queries/restapi.queries";
import { useCurrentEmployee } from "hooks/coreData/useCurrentEmployee";

const UserEmailNotificationSettingsContainer = () => {
  const currentEmployee = useCurrentEmployee();

  const { loading, data } = useQuery(GET_EMPLOYEE_EMAILS, {
    variables: {
      employeeId: currentEmployee.id
    }
  });

  return <UserEmailNotificationSettings employeeEmails={data?.employeeEmails ?? []} isLoading={loading} />;
};

export default UserEmailNotificationSettingsContainer;
