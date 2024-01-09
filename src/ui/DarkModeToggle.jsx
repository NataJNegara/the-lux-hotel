import ButtonIcon from "./ButtonIcon";
import { HiMiniSun, HiOutlineMoon } from "react-icons/hi2";
import { useDarkMode } from "../context/DarkModeContext";

export default function DarkmodeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {!isDarkMode ? <HiOutlineMoon /> : <HiMiniSun />}
    </ButtonIcon>
  );
}
