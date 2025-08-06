import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import PageContentWrapper from "./PageContentWrapper";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <PageContentWrapper>Content</PageContentWrapper>
    </TestProvider>
  );
  root.unmount();
});
