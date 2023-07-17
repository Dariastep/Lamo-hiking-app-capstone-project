import styled from "styled-components";
import Login from "./Login";


export default function NonAuthorizedUser() {
  return (
    <Wrapper>
      <Notification>
        <NotificationImage src="/path/to/image.png" alt="Notification Image" />
        <p>You are not authorized, please log in.</p>
        <Login />
      </Notification>
    </Wrapper>
  );
}


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Notification = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NotificationImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 1rem;
`;