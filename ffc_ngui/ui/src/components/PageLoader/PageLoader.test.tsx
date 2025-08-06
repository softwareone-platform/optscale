import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import PageLoader from "./PageLoader";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <PageLoader />
    </TestProvider>
  );
  root.unmount();
});
