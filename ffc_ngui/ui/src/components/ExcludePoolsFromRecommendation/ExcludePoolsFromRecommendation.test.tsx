import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ExcludePoolsFromRecommendation from "./ExcludePoolsFromRecommendation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ExcludePoolsFromRecommendation name="obsoleteImages" onSuccess={vi.fn} />
    </TestProvider>
  );
  root.unmount();
});
