import ProfileMenu from "@theme/components/ProfileMenu/ProfileMenu";
import { useGetToken } from "hooks/useGetToken";
import UserService from "services/UserService";

// Overrides upstream's to pass `onItemClick` through, so the menu's popover closes when an item navigates.
const ProfileMenuContainer = ({ onItemClick }: { onItemClick?: () => void }) => {
  const { userId } = useGetToken();

  const { useGet } = UserService();
  const {
    isDataReady,
    user: { name = "", email = "" }
  } = useGet(userId);

  return <ProfileMenu name={name} email={email} isLoading={!isDataReady} onItemClick={onItemClick} />;
};

export default ProfileMenuContainer;
