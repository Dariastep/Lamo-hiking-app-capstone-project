export async function toggleFavorite({ id, isFavorite }) {
  try {
    const requestBody = { isFavorite, id };
    const response = await fetch("/api/favorites", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.ok) {
      mutate("/api/favorites"); // Pass the updated data here
    } else {
      console.error("Failed to toggle favorite status.");
    }
  } catch (error) {
    console.error("Failed to toggle favorite status.");
  }
}
