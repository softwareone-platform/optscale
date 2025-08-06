import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import MetricLegend from "./MetricLegend";

it("renders empty message without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <MetricLegend />
    </TestProvider>
  );
  root.unmount();
});
