import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ResourceLifecycleGlobalPoolPoliciesContainerMocked from "./ResourceLifecycleGlobalPoolPoliciesContainerMocked";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ResourceLifecycleGlobalPoolPoliciesContainerMocked />
    </TestProvider>
  );
  root.unmount();
});
