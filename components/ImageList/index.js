import useSWR from "swr";
// we want to use the next Image component to display our cloudinary images
import Image from "next/image";
import styled from "styled-components";
// When setting up a detail page use the Next Link component to add the Linking
import Link from "next/link";


export default function ImageList() {
  // get image data (and error for error handling) via useSWR hook from the next api route
  const { data, error } = useSWR("/api/images");
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <StyledList>
      {/* map over our data.resources to get render every image returned*/}
      {data.resources.map((image) => (
        <StyledListItem key={image.asset_id}>
          <Link href={`/images/${image.public_id}`} key={image.asset_id} legacyBehavior>
            {/* wrapping our Next StyledImage in an <a>-Tag is necessary to avoid some next errors 🤷‍♂️*/}
            <a>
              <StyledImage
                key={image.public_id}
                src={image.url}
                layout="responsive"
                height={image.height}
                width={image.width}
                alt={`Image-Id: ${image.public_id}`}
              />
            </a>
          </Link>
          {/*Check for available Tags to display by mapping through the tags array of image, otherwise show nothing or untagged*/}
          <p>
            {image.tags.length > 0 ? (
              image.tags.map((tag, index) => (
                <StyledTag key={`tag-${index}`}>{tag}</StyledTag>
              ))
            ) : (
              <i>untagged</i>
            )}
          </p>
        </StyledListItem>
      ))}
    </StyledList>
  );
}

export const StyledTag = styled.span`
  background-color: #ddd;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
`;
const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;
const StyledListItem = styled.li`
  margin-bottom: 2rem;
  border-bottom: 1px solid #ccc;
`;
const StyledImage = styled(Image)`
  border-radius: 0.5rem;
  border-color: aliceblue;
`;