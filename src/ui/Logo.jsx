import styled from "styled-components";
// import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  /* height: 9.6rem; */
  height: 14rem;
  width: auto;
`;

function Logo() {
  // const { isDarkMode } = useDarkMode();

  // const logoImg = !isDarkMode ? "/logo-light.png" : "/logo-dark.png";
  const logoImg = "/newbg-app.png";

  return (
    <StyledLogo>
      <Img src={logoImg} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
