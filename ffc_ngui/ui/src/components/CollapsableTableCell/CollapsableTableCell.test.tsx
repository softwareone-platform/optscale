import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import CollapsableTableCell from "./CollapsableTableCell";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <CollapsableTableCell tags={{}} />
    </TestProvider>
  );
  root.unmount();
});
