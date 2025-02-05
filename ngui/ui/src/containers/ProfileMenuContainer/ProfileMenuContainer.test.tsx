import { createRoot } from "react-dom/client";
import TestProvider from "tests/TestProvider";
import ProfileMenuContainer from "./ProfileMenuContainer";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(
    <TestProvider
      state={{
        initial: {
          user_id: "123"
        }
      }}
    >
      <ProfileMenuContainer name={"profile-name"} />
    </TestProvider>
  );
  root.unmount();
});
