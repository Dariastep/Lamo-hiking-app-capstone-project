export async function toggleFavorite({ _id, isFavorite }) {
  try {
    const requestBody = { isFavorite, _id };
    const response = await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    
    if (response.ok) {
      mutate(); // Pass the updated data here
    } else {
      console.error("Failed to toggle favorite status.");
    }
  } catch (error) {
    console.error("Failed to toggle favorite status.");
  }
}
