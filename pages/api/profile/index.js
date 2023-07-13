import User from "../../../lib/db/models/User.js";
import dbConnect from "../../../lib/db/connect";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const users = await User.find();
      response.status(200).json(users);
    } catch (error) {
      response
        .status(405)
        .json({ message: "Failed to load user information", error });
    }
  } else if (request.method === "PUT") {
    try {
      const { name, email, imageURL } = request.body;
      // Check if there is an existing user
      const existingUser = await User.findOne();
      if (existingUser) {
        existingUser.name = name;
        existingUser.email = email;
        existingUser.imageURL = imageURL;

        await existingUser.save();
      } else {
        // Otherwise create a user
        await User.create({ name, email, imageURL });
      }
      response
        .status(201)
        .json({ message: "User information updated successfully" });
    } catch (error) {
      response
        .status(405)
        .json({ message: "Failed to update user information", error });
    }
  } else {
    response.status(405).json({ message: "Method is not allowed" });
  }
}
