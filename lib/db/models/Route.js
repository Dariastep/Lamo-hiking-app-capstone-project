import mongoose from "mongoose";

const { Schema, model } = mongoose;

const routesSchema = new Schema({
  name: { type: String, required: true },
  activity: { type: String, required: true },
  difficulty: { type: String, required: true },
  length: { type: Number, required: true },
  altitude: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: false },
  isFavorite: { type: Boolean, default: false },
  createdBy: { type: String, default: false },
});

const Route = mongoose.models.Route || mongoose.model("Route", routesSchema);

export default Route;
