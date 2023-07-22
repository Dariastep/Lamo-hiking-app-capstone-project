import styled from "styled-components";

export const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  
  margin: 0rem 0.5rem;
  overflow: hidden;
  z-index: 1;

`;
export const ListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  border-radius: 10px;
  padding: 1rem;
  background-color: #EDEDED;
  margin:  0rem auto 2.5rem;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 5px -5px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

