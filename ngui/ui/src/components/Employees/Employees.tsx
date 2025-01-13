import { Box } from "@mui/material";
import ActionBar from "components/ActionBar";
import EmployeesTable from "components/EmployeesTable";
import PageContentWrapper from "components/PageContentWrapper";

const Employees = ({ employees, isLoading }) => (
  <>
    <ActionBar
      data={{
        title: {
          messageId: "users",
          dataTestId: "lbl_users"
        }
      }}
    />
    <PageContentWrapper>
      <Box className={"MTPBoxShadow"}>
        <EmployeesTable employees={employees} isLoading={isLoading} />
      </Box>
    </PageContentWrapper>
  </>
);

export default Employees;
