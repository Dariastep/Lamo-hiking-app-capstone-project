import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: false },
  imageURL: { type: String, required: false },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
