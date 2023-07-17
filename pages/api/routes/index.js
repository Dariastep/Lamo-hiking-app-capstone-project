import dbConnect from "../../../lib/db/connect";
import Route from "../../../lib/db/models/Route.js";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const route = await Route.find();
      if (route.length === 0) {
        response.status(404).json({ status: "The route are not found" });
      }
      return response.status(200).json(route);
    } catch (error) {
      return response.status(405).json({ message: "Failed to load the data" });
    }
  }
  if (request.method === "POST") {
    try {
      const newRoute = await request.body;
      await Route.create(newRoute);
      response.status(201).json(newRoute);
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
  if (request.method === "PATCH") {
    const updatedRoute = request.body;
    const routes = await Route.findByIdAndUpdate(id, updatedRoute);
    if (!routes) {
      return response.status(404).json({ status: "Not found" });
    }
    response.status(201).json({ status: "The route is edited" });
  }
}
