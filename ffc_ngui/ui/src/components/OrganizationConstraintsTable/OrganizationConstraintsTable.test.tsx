import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import OrganizationConstraintsTable from "./OrganizationConstraintsTable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <OrganizationConstraintsTable constraints={[]} addButtonLink="" />
    </TestProvider>
  );
  root.unmount();
});
