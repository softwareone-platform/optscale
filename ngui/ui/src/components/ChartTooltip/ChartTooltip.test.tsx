import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ChartTooltip from "./ChartTooltip";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ChartTooltip />
    </TestProvider>
  );
  root.unmount();
});
