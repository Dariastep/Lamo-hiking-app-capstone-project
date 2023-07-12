import useSWR from "swr";
// we want to use the next Image component to display our cloudinary images
import Image from "next/image";
import styled from "styled-components";
// When setting up a detail page use the Next Link component to add the Linking
import Link from "next/link";
import { useState } from "react";


export default function Avatar() {
  const [avatar, setAvatar] = useState(null);
  // get image data (and error for error handling) via useSWR hook from the next api route
  const { data, error } = useSWR("/api/images");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <AvatarWrapper>
      <StyledAvatar
        src={data}
        alt="Default avatar"
        width={200}
        height={200}
      />
    
  </AvatarWrapper>)};
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


