import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import SideModalHeader from "./SideModalHeader";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <SideModalHeader messageId="deleteResources" onClose={vi.fn} />
    </TestProvider>,
    div
  );
  root.unmount();
});
