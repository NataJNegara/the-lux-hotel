import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullSpinner = styled.div`
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: var(--color-grey-50);
`;

export default function ProtectedRotue({ children }) {
  const navigate = useNavigate();

  //1 - load the authenticated user
  const { isLoading, isAuthenticated, fetchStatus } = useUser();
  //   console.log(user);

  //2 - if there is no authenticated user, redirect to "/login"
  useEffect(() => {
    if (!isAuthenticated && !isLoading && fetchStatus !== "fetching")
      navigate("/login");
  }, [isAuthenticated, navigate, isLoading, fetchStatus]);

  //3 - while loading, show spinner
  if (isLoading)
    return (
      <FullSpinner>
        <Spinner />
      </FullSpinner>
    );

  //4 - if there is user, render the app
  return children;
}
