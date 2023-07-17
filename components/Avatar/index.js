import Image from "next/image";
import styled from "styled-components";
import AvatarImage from "../../public/avatar.jpg"; 
import Loader from "../Loader";

export default function Avatar({ data, error, avatar }) {
  if (error) return <div>failed to load</div>;
  if (!data) return <div><Loader /></div>;
  const imageUrl = avatar || data.resources[0]?.url || AvatarImage;
  return (
    <AvatarWrapper>
      <StyledAvatar
        src={imageUrl}
        alt="Default avatar"
        width={200}
        height={200}
      />
    </AvatarWrapper>
  );
}
const StyledAvatar = styled(Image)`
  border-radius: 0.5rem;
  border-color: aliceblue;
  display: block;
`;
const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  height: 200px;
  width: 200px;
`;
