import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import { UNKNOWN } from "utils/constants";
import DeleteAssignmentRule from "./DeleteAssignmentRule";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <DeleteAssignmentRule isLoading={false} onSubmit={vi.fn} sendState={UNKNOWN} setModalOpen={vi.fn} />
    </TestProvider>
  );
  root.unmount();
});
