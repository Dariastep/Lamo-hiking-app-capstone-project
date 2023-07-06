import mongoose from "mongoose";

const { Schema, model } = mongoose;

const routesSchema = new Schema({
  name: { type: String, required: true },
  activity: { type: String, required: true },
  difficulty: { type: String, required: true },
  length: { type: String, required: true },
  altitude: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

const Route = mongoose.models.Route || mongoose.model("Route", routesSchema);

export default Route;
