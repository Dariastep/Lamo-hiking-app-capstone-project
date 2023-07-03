import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";

export default function FavoriteButton({ id }) {
  const [toggleFavoriteRoute, setToggleFavoriteRoute] = useLocalStorageState(
    `toggleFavoriteRoute-${id}`,
    false
  );
  function handleFavoriteClick() {
    setToggleFavoriteRoute((prev) => !prev);
  }

  return (
    <Bookmark name="favorite button" onClick={handleFavoriteClick} toggleFavoriteRoute={toggleFavoriteRoute}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={24}
        width={24}
        role="img"
        aria-hidden="true"
        fill={toggleFavoriteRoute ? "var(--secondary-color)" : "black"}
      >
        <path d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
      </svg>
    </Bookmark>
  );
}

const Bookmark = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  z-index: 2;
  cursor: pointer;
  border-radius: 20%;
  background-color: ${(props) =>
    props.toggleFavoriteRoute
    ? "var(--primary-color)"
      : "var(--tercery-color)"};

  &:hover {
    border-radius: 20%;
    background-color: var(--primary-color);
  }
`;