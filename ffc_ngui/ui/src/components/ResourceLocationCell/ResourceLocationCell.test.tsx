import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ResourceLocationCell from "./ResourceLocationCell";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <ResourceLocationCell
        dataSource={{
          id: "id",
          name: "name",
          type: "aws_cnr"
        }}
      />
    </TestProvider>
  );
  root.unmount();
});
