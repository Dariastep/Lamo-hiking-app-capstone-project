import styled from "styled-components";
import Link from "next/link";

export default function BackButton() {
  return (
    <Link href="/">
      <Back>&#8249;</Back>
    </Link>
  );
}

const Back = styled.span`
  display: inline-block;
  background-color: #0170c4;
  border-radius: 50%;
  color: white;
  padding: 1rem 1.5rem;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #015c9e;
  }
`;
