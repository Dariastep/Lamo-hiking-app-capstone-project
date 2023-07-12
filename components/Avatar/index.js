import useSWR, { mutate } from "swr";
// we want to use the next Image component to display our cloudinary images
import Image from "next/image";
import styled from "styled-components";
import AvatarImage from "../../public/avatar.jpg";
import { useEffect, useState } from "react";
// When setting up a detail page use the Next Link component to add the Linking

export default function Avatar({ data, error }) {
  const [updatedData, setUpdatedData] = useState([data]);
  useEffect(() => {
    setUpdatedData(data);
  }, [data]);
  mutate("/api/images");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const imageUrl = data.resources[0]?.url || AvatarImage;
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
