import { signIn, signOut } from "next-auth/react";
import Button from "../Button";
import styled from "styled-components";

export default function Login({ session }) {
  return (
    <>
      {session ? ( // check if we have session data (= user is already signed in => display a logout button)
        <>
          <Button ButtonName="Logout" onClick={signOut} isSecondaryButton />
        </>
      ) : (
        // no session data available yet, display a login button
        <Button ButtonName="Login" onClick={() => signIn("github")} />
      )}
    </>
  );
}
