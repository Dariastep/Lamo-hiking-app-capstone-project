// needed to read the .env variables
import process from "node:process";
import cloudinary from "cloudinary";
import dbConnect from "../../../lib/db/connect";
import User from "../../../lib/db/models/User";

// as the default setting of Next.js API is using the bodyParser, we need to deactivate it by setting its config
export const config = {
  api: {
    bodyParser: false,
  },
};
// set the cloudinary config to use your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export default async function handler(request, response) {
  /*  await dbConnect(); */
  if (request.method === "GET") {
    try {
      // we use cloudinary search API to retrieve images
      const result = await cloudinary.v2.search
        // see documentation to adjust the query at https://cloudinary.com/documentation/search_api#examples
        .with_field("tags")
        .max_results(10)
        .execute();
      // finally we deliver the response with the result as JSON
      response.status(200).json(result);
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: error.message });
    }
  }
  if (request.method === "PUT") {
    try {
      const { imageURL } = request.body;
      if (!imageURL) {
        throw new Error("Image URL is missing in the request body");
      }

      const existingUser = await User.findOne();
      if (existingUser) {
        existingUser.avatar = imageURL;
        await existingUser.save();
      } else {
        await User.create({ avatar: imageURL });
      }
      response.status(200).json({ message: "Avatar updated in MongoDB" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  }
}
