import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function NavigationBar() {
  const router = useRouter();
  return (
    <NavigationContainer>
      <NavigationSection active={router.pathname === "/"}>
        <NavigationLink href={"/"}>Explore</NavigationLink>
      </NavigationSection>
      <NavigationSection active={router.pathname === "/favorites"}>
        <NavigationLink href={"/favorites"}>Favorites</NavigationLink>
      </NavigationSection>
      <NavigationSection active={router.pathname === "/myProfile"}>
        <NavigationLink href={"/myProfile"}>My Profile</NavigationLink>
      </NavigationSection>
    </NavigationContainer>
  );
}

export const NavigationContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--secondary-color);
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const NavigationLink = styled(Link)`
  text-decoration: none;
  color: ${(isActive) => (isActive.active ? "green" : "var(--primary-color)")};
  font-weight: bold;
`;

export const NavigationSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 1.5rem;
  background-color: ${(isActive) => (isActive.active ? "grey" : "transparent")};
  transition: background-color 0.3s;
`;
