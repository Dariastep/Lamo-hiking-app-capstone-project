// needed to read the .env variables

import dbConnect from "../../../../lib/db/connect.js";
import User from "../../../../lib/db/models/User.js";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "PUT") {
    try {
      const { imageURL } = request.body;
      if (!imageURL) {
        throw new Error("Image URL is missing in the request body");
      }

      const existingUser = await User.findOne();
      if (existingUser) {
        existingUser.imageURL = imageURL;
        await existingUser.save();
        console.log("Avatar in PUT", imageURL);
      } else {
        await User.create({ imageURL });
      }
      response.status(200).json({ message: "Avatar updated in MongoDB" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: error.message });
    }
  }
}
