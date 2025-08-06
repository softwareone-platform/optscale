import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ExpensesDailyBreakdown from "./ExpensesDailyBreakdown";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ExpensesDailyBreakdown />
    </TestProvider>
  );
  root.unmount();
});
