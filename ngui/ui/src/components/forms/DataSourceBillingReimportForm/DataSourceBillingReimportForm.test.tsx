import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import DataSourceBillingReimportForm from "./DataSourceBillingReimportForm";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <DataSourceBillingReimportForm onSubmit={vi.fn} />
    </TestProvider>
  );
  root.unmount();
});
