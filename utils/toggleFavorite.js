export async function toggleFavorite(id, isFavorite) {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isFavorite }),
      });
      if (response.ok) {
        mutate("/api/favorites");
      } else {
        console.error("Failed to toggle favorite status.");
      }
    } catch (error) {
      console.error("Failed to toggle favorite status.");
    }
  }