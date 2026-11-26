import ProfileMenu from "components/ProfileMenu";
import { useGetToken } from "hooks/useGetToken";
import UserService from "services/UserService";

const ProfileMenuContainer = ({ onItemClick }: { onItemClick?: () => void }) => {
  const { userId } = useGetToken();

  const { useGet } = UserService();
  const {
    isDataReady,
    user: { name = "", email = "" },
  } = useGet(userId);

  return <ProfileMenu name={name} email={email} isLoading={!isDataReady} onItemClick={onItemClick} />;
};

export default ProfileMenuContainer;
