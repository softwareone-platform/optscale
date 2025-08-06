import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ArchivedResourcesCountBarChart from "./ArchivedResourcesCountBarChart";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ArchivedResourcesCountBarChart onSelect={vi.fn} breakdown={{}} />
    </TestProvider>,
    div
  );
  root.unmount();
});
