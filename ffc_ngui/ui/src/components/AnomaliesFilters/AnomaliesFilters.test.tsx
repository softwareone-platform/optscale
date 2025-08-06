import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import AnomaliesFilters from "./AnomaliesFilters";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <AnomaliesFilters filters={{}} />
    </TestProvider>
  );
  root.unmount();
});
