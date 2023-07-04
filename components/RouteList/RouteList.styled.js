import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 4rem 0.5rem;
  overflow: hidden;
  z-index: 1;
`;
export const ListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  border: 1px solid var(--tercery-color);
  border-radius: 10px;
  padding: 1rem;
  background-color: var(--tercery-color);
  margin: auto;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

export const Heading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
  background-color: var(--secondary-color);
  padding: 1rem;

  h1 {
    color: var(--primary-color);
  }
`;

