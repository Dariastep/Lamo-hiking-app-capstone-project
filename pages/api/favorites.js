import dbConnect from "../../lib/db/connect.js";
import Route from "../../lib/db/models/Route.js";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    try {
      const favoriteRoutes = await Route.find({ isFavorite: true });
      if (!favoriteRoutes) {
        response.status(404).json({ status: "No favorite routes found" });
      }

      return response.status(200).json(favoriteRoutes);
    } catch (error) {
      response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "POST") {
    try {
      const { id, isFavorite } = request.body;
      const newFavoriteRoute = await Route.findById(id);
      if (!newFavoriteRoute) {
        response.status(404).json({ error: "Route not found" });
      }
      newFavoriteRoute.isFavorite = isFavorite;
      await newFavoriteRoute.save();
      response.status(201).json({ status: "Route added to favorites" });
    } catch (error) {
      response.status(405).json({ error: error.message });
    }
  }

  if (request.method === "PATCH") {
    try {
      const { id, isFavorite } = request.body;
      const updatedRoute = await Route.findByIdAndUpdate(id, { isFavorite });
      
      if (!updatedRoute) {
        response.status(404).json({ status: "The route not found" });
      }
      response.status(201).json({ status: "The route is updated" });
    } catch (error) {
      response.status(405).json({ message: error });
    }
  }

  response.status(405).json({ error: "Method not allowed" });
}
