import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import EditablePoolPolicyLimit from "./EditablePoolPolicyLimit";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <EditablePoolPolicyLimit />
    </TestProvider>
  );
  root.unmount();
});
