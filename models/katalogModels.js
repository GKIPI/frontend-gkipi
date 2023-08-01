// Import the Mongoose model and schema
import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

const katalogSchema = new Schema({
  user: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  prize: { type: Number , required: true },
  tag :[{type: String , required: false}],
  approval: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now, required: true },
});

const KatalogModel = models.Katalog || model("Katalog", katalogSchema);

export default KatalogModel;
