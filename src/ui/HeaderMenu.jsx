import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import DarkmodeToggle from "./DarkmodeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

export default function HeaderMenu() {
  const navigate = useNavigate();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUserCircle />
        </ButtonIcon>
      </li>
      <li>
        <DarkmodeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </StyledHeaderMenu>
  );
}
