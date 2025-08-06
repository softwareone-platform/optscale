import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ResourceRecommendations from "./ResourceRecommendations";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ResourceRecommendations recommendations={[]} dismissedRecommendations={[]} />
    </TestProvider>
  );
  root.unmount();
});
