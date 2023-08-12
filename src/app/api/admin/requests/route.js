// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../lib/db";
import KatalogModel from "../../../../../models/katalogModels";
import VacancyModel from "../../../../../models/vacancyModels";
import SeekerModel from "../../../../../models/seekerModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        // Connect to the database
        await startDb();

        // Fetch data from the Mongoose model and send the response
        const katalogs = await KatalogModel.find({
            approval: false,
        })
        const vacancy = await VacancyModel.find({
            approval: false,
        })
        const seeker = await SeekerModel.find({
            approval: false,
        })
        return NextResponse.json({ len: [katalogs.length, vacancy.length, seeker.length] }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}
