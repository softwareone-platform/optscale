import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import CloudType from "./CloudType";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <CloudType type="aws_cnr" />
    </TestProvider>
  );
  root.unmount();
});
