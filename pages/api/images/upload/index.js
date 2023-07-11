import process from "node:process";

import cloudinary from "cloudinary";
import formidable from "formidable";
// formidable does not work with the default api settings o Next.js, so we disable the bodyParser via config
export const config = {
  api: {
    bodyParser: false
  }
};
// set the cloudinary config to use your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});
// define our async handler function
export default async function handler(request, response) {
  // we only look for POST request method
  switch (request.method) {
    case "POST":
      // we wrap our POST data handling in a Promise to support correct handling of our async method
      await new Promise((resolve, reject) => {
        // initializing a new (empty) formidable form which we use to
        const form = formidable({});
        // parse our request in order to get adequate values for our file to upload
        form.parse(request, async (error, fields, files) => {
          if (error) {
            // in case of error, the promise rejects (resulting in an error catched in our upload form)
            reject(error);
          } else {
            // formidable offers us a handy way to get the file data exactly how we need it to pass it to the cloudinary upload API
            const { file } = files;
            // newFilename is a temporary filename like e.g. "de49ea6ae2b56c0208f640300"
            const { newFilename, filepath } = file;
            // finally we call the cloudinary upload API with our values and pass the temporary filename as public_id
            const result = await cloudinary.v2.uploader.upload(filepath, {
              public_id: newFilename
            });
            console.log("API: response from cloudinary: ", result);
            response.status(201).json(result);
            // As our request is successful, we call the promises' resolve()-method (fulfilling the try block in our upload form handler)
            resolve();
          }
        });
      });
      break;
    default:
      response.status(400).json({ message: "Method not implemented" });
      break;
  }
}