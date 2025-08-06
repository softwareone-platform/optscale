import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import PaidNetworkTrafficLabel from "./PaidNetworkTrafficLabel";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <PaidNetworkTrafficLabel />
    </TestProvider>
  );
  root.unmount();
});
