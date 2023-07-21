import { useState, useEffect } from "react";
import styled from "styled-components";

export default function FavoriteButton({ id }) {
  const [isFavorite, setIsFavorite] = useState(false);
  // Beim Laden der Seite den Favoritenstatus aus der Datenbank abrufen
  useEffect(() => {
    async function fetchFavoriteStatus() {
      try {
        const response = await fetch(`/api/routes/${id}`);
        if (response.ok) {
          const route = await response.json();
          setIsFavorite(route.isFavorite);
        } else {
          console.log("Failed to fetch the favorite status");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchFavoriteStatus();
  }, [id]);

  async function handleFavoriteClick() {
    try {
      const response = await fetch(`/api/routes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite: !isFavorite }),
      });
      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.log("Failed to update the favorite status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Bookmark
      name="favorite button"
      onClick={handleFavoriteClick}
      isFavorite={isFavorite}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        height={24}
        width={24}
        role="img"
        aria-hidden="true"
        fill={isFavorite ? "var(--primary-color)" : "white"}
      >
        <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
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
    props.isFavorite ? "var(--secondary-color)" : "var(--tercery-color)"};
`;
