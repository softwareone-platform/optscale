import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import WrapperCard from "./WrapperCard";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <WrapperCard />
    </TestProvider>
  );
  root.unmount();
});
