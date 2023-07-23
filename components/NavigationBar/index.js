import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

export default function NavigationBar() {
  const router = useRouter();
  return (
    <NavigationContainer>
      <NavigationSection active={router.pathname === "/"}>
        <NavigationLink href={"/"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={28}
            height={28}
          >
            <title>compass</title>
            <path
              fill="white"
              d="M14.19,14.19L6,18L9.81,9.81L18,6M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,10.9A1.1,1.1 0 0,0 10.9,12A1.1,1.1 0 0,0 12,13.1A1.1,1.1 0 0,0 13.1,12A1.1,1.1 0 0,0 12,10.9Z"
            />
          </svg>{" "}
          <LinkName active={router.pathname === "/"}>explore</LinkName>
        </NavigationLink>
      </NavigationSection>
      <NavigationSection active={router.pathname === "/myRoutes"}>
        <NavigationLink href={"/myRoutes"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={28}
            height={28}
          >
            <title>map-marker-circle</title>
            <path
              fill="white"
              d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,12.5A1.5,1.5 0 0,1 10.5,11A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 13.5,11A1.5,1.5 0 0,1 12,12.5M12,7.2C9.9,7.2 8.2,8.9 8.2,11C8.2,14 12,17.5 12,17.5C12,17.5 15.8,14 15.8,11C15.8,8.9 14.1,7.2 12,7.2Z"
            />
          </svg>
          <LinkName active={router.pathname === "/myRoutes"}>
            my routes
          </LinkName>
        </NavigationLink>
      </NavigationSection>
      <NavigationSection active={router.pathname === "/favorites"}>
        <NavigationLink href={"/favorites"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={28}
            height={28}
            fill="red"
          >
            <title>heart</title>
            <path
              fill="white"
              d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
            />
          </svg>
          <LinkName active={router.pathname === "/favorites"}>
            favorites
          </LinkName>
        </NavigationLink>
      </NavigationSection>
      <NavigationSection active={router.pathname === "/myProfile"}>
        <NavigationLink href={"/myProfile"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={28}
            height={28}
          >
            <title>face-man-profile</title>
            <path
              fill="white"
              d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,8.39C13.57,9.4 15.42,10 17.42,10C18.2,10 18.95,9.91 19.67,9.74C19.88,10.45 20,11.21 20,12C20,16.41 16.41,20 12,20C9,20 6.39,18.34 5,15.89L6.75,14V13A1.25,1.25 0 0,1 8,11.75A1.25,1.25 0 0,1 9.25,13V14H12M16,11.75A1.25,1.25 0 0,0 14.75,13A1.25,1.25 0 0,0 16,14.25A1.25,1.25 0 0,0 17.25,13A1.25,1.25 0 0,0 16,11.75Z"
            />
          </svg>
          <LinkName active={router.pathname === "/myProfile"}>
            my profile
          </LinkName>
        </NavigationLink>
      </NavigationSection>
    </NavigationContainer>
  );
}

const NavigationContainer = styled.nav`
  position: fixed;
  height: 4.5rem;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  background-color: var(--primary-color);
  border-top-left-radius: 8% 35px;
  border-top-right-radius: 8% 35px;
  overflow: hidden;
`;
const NavigationLink = styled(Link)`
  text-decoration: none;
  color: var(--secondary-color);
  font-weight: bold;
  text-align: center;
`;

const NavigationSection = styled.div`
  background-color: ${(props) =>
    props.active ? "var(--secondary-color)" : "transparent"};
  display: flex;
  height: 100%;
  justify-content: center;
  transition: background-color 0.3s;
  align-items: center;
`;
const LinkName = styled.p`
  color: white;
  font-weight: 300;
  font-size: 0.9rem;
`;
