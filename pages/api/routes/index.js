import dbConnect from "../../../lib/db/connect";
import hikingApp from "@/lib/db/models/Route";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    try {
      const route = await hikingApp.find();

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
      const newRoute = request.body;
      await hikingApp.create(newRoute);
      response.status(201).json({ status: "New route created" });
    } catch (error) {
      response.status(400).json({ error: error.message });
    }
  }
}
