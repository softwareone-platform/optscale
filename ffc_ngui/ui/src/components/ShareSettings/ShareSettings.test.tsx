import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ShareSettings from "./ShareSettings";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ShareSettings canEdit currentLink={""} onChange={vi.fn} isLoading={false} />
    </TestProvider>
  );
  root.unmount();
});
