import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import SummaryList from "./SummaryList";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <SummaryList titleMessage="name" />
    </TestProvider>
  );
  root.unmount();
});
