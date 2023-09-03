// Import the Mongoose model and schema
import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

const activitySchema = new Schema({
  user: { type: String, required: true },
  image: { type: String, required: true },
  title: { type: String, required: true },
  details:{type:String, required: false},
  createdAt: { type: Date, default: Date.now, required: true },
});

const ActivityModel = models.Activity || model("Activity", activitySchema);

export default ActivityModel;
