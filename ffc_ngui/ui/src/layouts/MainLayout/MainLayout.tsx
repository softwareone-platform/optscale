import { useOrganizationInfo } from "hooks/useOrganizationInfo";
import BaseLayout from "layouts/BaseLayout";

const MainLayout = ({ children, mainMenu }) => {
  const { organizationId } = useOrganizationInfo();

  return (
    <BaseLayout
      showMainMenu={organizationId != undefined}
      showOrganizationSelector={organizationId != undefined}
      mainMenu={mainMenu}
    >
      {children}
    </BaseLayout>
  );
};

export default MainLayout;
