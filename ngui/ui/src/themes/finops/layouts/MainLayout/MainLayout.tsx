import BaseLayout from "@theme/layouts/BaseLayout/BaseLayout";
import { useOrganizationInfo } from "hooks/useOrganizationInfo";

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
