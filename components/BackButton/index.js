import Link from "next/link";
import styled from "styled-components";

export default function BackButton() {
  return (
    <BackLink href={"/"}>
      <BackArrow>&larr;</BackArrow>
      <BackText>Go Back</BackText>
    </BackLink>
  );
}

const BackLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background-color: var(--tercery-color);
    border-radius: 30%;
  }
`;

const BackArrow = styled.span`
  display: inline-block;
  margin-right: 0.5rem;
`;

const BackText = styled.span`
  //for the screen readers
  display: inline-block;
  visibility: hidden;
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;
