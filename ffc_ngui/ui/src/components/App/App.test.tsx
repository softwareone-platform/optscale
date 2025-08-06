import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import App from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <App />
    </TestProvider>
  );
  root.unmount();
});
