import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import CloudAccountsTable from "./CloudAccountsTable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <CloudAccountsTable />
    </TestProvider>
  );
  root.unmount();
});
