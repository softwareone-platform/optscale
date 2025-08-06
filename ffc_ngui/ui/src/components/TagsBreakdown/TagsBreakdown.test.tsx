import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import TagsBreakdown from "./TagsBreakdown";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <TagsBreakdown
        data={[]}
        appliedRange={{}}
        chartCountKeys={[]}
        chartCounts={{}}
        chartData={[]}
        updateSelectedTag={() => {}}
      />
    </TestProvider>
  );
  root.unmount();
});
