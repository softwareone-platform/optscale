import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import MlExecutorsTable from "./MlExecutorsTable";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <MlExecutorsTable executors={[]} />
    </TestProvider>
  );
  root.unmount();
});
