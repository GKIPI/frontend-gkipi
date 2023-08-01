// Import the Mongoose model and schema
import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";

const vacancySchema = new Schema({
    user: { type: String, required: true },
    image: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    tag :[{type: String , required: false}],
    approval: { type: Boolean, required: true, default: false },
    createdAt: { type: Date, default: Date.now, required: true },
});

const VacancyModel = models.Vacancy || model("Vacancy", vacancySchema);

export default VacancyModel;
