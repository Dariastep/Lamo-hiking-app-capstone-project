import styled from "styled-components";

export default function Logo() {
  return (
    <LogoIcon>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={24}
        width={24}
        role="img"
        aria-hidden="true"
        fill={"var(--secondary-color)"}
      >
        <title>image-filter-hdr</title>
        <path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z" />
      </svg>
      <h1>Lamo</h1>
    </LogoIcon>
  );
}

const LogoIcon = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  flex: 1;
  justify-content: center;

  h1 {
    font-size: 1.25rem;
    margin: 0;
    color: var(--secondary-color) !important;
    font-weight: 700;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
  }

  svg {
    margin: auto;
  }
`;
