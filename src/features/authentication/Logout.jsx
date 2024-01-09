import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

export default function Logout() {
  const { isLogout, logout } = useLogout();

  return (
    <ButtonIcon onClick={logout} disabled={isLogout}>
      {!isLogout ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}
