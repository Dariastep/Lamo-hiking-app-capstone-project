import { useEffect } from "react";
import styled from "styled-components";

export default function Banner({ bannerStatus, setShowBanner }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBanner(false); // Hide the banner after 3 seconds (adjust as needed)
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [setShowBanner]);

  return <BannerWrapper>{bannerStatus}</BannerWrapper>;
}

const BannerWrapper = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  background-color: var(--action-color);
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  color: var(--main-text-color);
`;
