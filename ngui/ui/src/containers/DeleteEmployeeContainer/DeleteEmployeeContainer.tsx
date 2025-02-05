import { useDispatch } from "react-redux";
import { deleteEmployee } from "api";
import { DELETE_EMPLOYEE } from "api/restapi/actionTypes";
import DeleteEmployeeForm from "components/forms/DeleteEmployeeForm";
import { FormValues } from "components/forms/DeleteEmployeeForm/types";
import { useCurrentEmployee } from "hooks/coreData";
import { useApiState } from "hooks/useApiState";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import { isError } from "utils/api";
import { getOrganizationManagers, getOrganizationManagersWhoSuitableForAssignment } from "utils/employees";

const DeleteEmployeeContainer = ({ employees, closeSideModal, entityToBeDeleted }) => {
  const { id: currentEmployeeId } = useCurrentEmployee();

  const { isLoading } = useApiState(DELETE_EMPLOYEE);
  const dispatch = useDispatch();
  const { name } = useOrganizationInfo();

  const organizationManagers = getOrganizationManagers(employees);

  const onSubmit = (formData: FormValues) => {
    dispatch((_, getState) => {
      dispatch(deleteEmployee(entityToBeDeleted.employeeId, { newOwnerId: formData.organizationManager })).then(() => {
        if (!isError(DELETE_EMPLOYEE, getState())) {
          closeSideModal();
        }
      });
    });
  };

  return (
    <DeleteEmployeeForm
      organizationName={name}
      organizationManagersWhoSuitableForAssignment={getOrganizationManagersWhoSuitableForAssignment(
        organizationManagers,
        entityToBeDeleted.employeeId
      )}
      isOnlyOneOrganizationManager={organizationManagers.length === 1}
      isDeletingMyself={currentEmployeeId === entityToBeDeleted.employeeId}
      onSubmit={onSubmit}
      entityToBeDeleted={entityToBeDeleted}
      closeSideModal={closeSideModal}
      isLoading={isLoading}
    />
  );
};

export default DeleteEmployeeContainer;
