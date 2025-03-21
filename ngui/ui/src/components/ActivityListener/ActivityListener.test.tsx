import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ActivityListener from "./ActivityListener";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ActivityListener>test</ActivityListener>
    </TestProvider>
  );
  root.unmount();
});
