import { logOut } from "@/redux/rtk/features/hrm/user/userSlice";
import { useEffect } from "react";
import { useLogoutMutation } from "../../Redux/features/register/registerApi";

function Logout(props) {
  const [logout, { isLoading }] = useLogoutMutation();
  useEffect(() => {
    logOut();
  }, [dispatch]);
}
export default Logout;
