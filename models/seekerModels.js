// Import the Mongoose model and schema
import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

const seekerSchema = new Schema({
  user: { type: String, required: true },
  name: {type: String, required: true},
  sex: { type: String, required: true },
  image: { type: String, required: true },
  jobTitle: { type: String, required: true },
  skills: [{ type: String, required: true }],
  tag: [{ type: String, required: false }],
  education: { type: String, required: true },
  age: { type: Number, required: true },
  approval: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now, required: true },
});

const SeekerModel = models.Seeker || model("Seeker", seekerSchema);

export default SeekerModel;
