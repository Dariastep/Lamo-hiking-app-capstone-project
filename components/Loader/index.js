import { Audio } from "react-loader-spinner";
import styled from "styled-components";


export default function Loader() {
  return (
    <PageContainer>
      <Audio
        height={80}
        width={80}
        radius={9}
        color="#008bf8"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </PageContainer>
  );
}

const PageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
`;
