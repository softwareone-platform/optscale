import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import TrafficMapMarker from "./TrafficMapMarker";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider>
      <TrafficMapMarker type="test" onClick={() => vi.fn} />
    </TestProvider>
  );
  root.unmount();
});
