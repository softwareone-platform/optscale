import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import CloudExpensesChartMarker from "./CloudExpensesChartMarker";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <CloudExpensesChartMarker value={100} valueMessageId="pool" chartBase={100} />
    </TestProvider>
  );
  root.unmount();
});
