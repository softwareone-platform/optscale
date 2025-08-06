import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import EnabledConstraints from "./EnabledConstraints";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <EnabledConstraints render={(type) => type} />
    </TestProvider>
  );
  root.unmount();
});
