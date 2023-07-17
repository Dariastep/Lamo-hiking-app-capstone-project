import { signIn, signOut } from "next-auth/react";
import CommonButton from "../CommonButton";
import styled from "styled-components";

export default function Login({ session }) {
  return (
    <StyledSection>
      {session ? ( // check if we have session data (= user is already signed in => display a logout button)
        <>
          <CommonButton ButtonName="Logout" onClick={signOut} />
         {/*  <p>Signed in as {session.user.email}</p> */}
        </>
      ) : (
        // no session data available yet, display a login button
        <CommonButton ButtonName="Login" onClick={() => signIn("github")} />
      )}
    </StyledSection>
  );
}

const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;