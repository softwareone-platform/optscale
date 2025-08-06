import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ClusterSubResourcesTable from "./ClusterSubResourcesTable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ClusterSubResourcesTable />
    </TestProvider>
  );
  root.unmount();
});
