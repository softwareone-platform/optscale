import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import KeyValueLabel from "components/KeyValueLabel/KeyValueLabel";
import { useGetToken } from "hooks/useGetToken";
import UserService from "services/UserService";
import { SPACING_1 } from "utils/layouts";

/** Who is signed in. The designs leave this tab open; it holds what the user menu already shows. */
const ProfileOverview = () => {
  const { userId } = useGetToken();

  const { useGet } = UserService();
  const {
    isDataReady,
    user: { name = "", email = "" },
  } = useGet(userId);

  if (!isDataReady) {
    return <Skeleton width={240} data-test-id="profile_overview_loading" />;
  }

  return (
    <Stack spacing={SPACING_1}>
      <KeyValueLabel keyMessageId="name" value={name} dataTestIds={{ key: "p_profile_name_key", value: "p_profile_name" }} />
      <KeyValueLabel
        keyMessageId="email"
        value={email}
        dataTestIds={{ key: "p_profile_email_key", value: "p_profile_email" }}
      />
    </Stack>
  );
};

export default ProfileOverview;
