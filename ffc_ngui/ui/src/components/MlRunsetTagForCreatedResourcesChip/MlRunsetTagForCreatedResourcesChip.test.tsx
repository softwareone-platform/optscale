import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import MlRunsetTagForCreatedResourcesChip from "./MlRunsetTagForCreatedResourcesChip";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <MlRunsetTagForCreatedResourcesChip />
    </TestProvider>
  );
  root.unmount();
});
