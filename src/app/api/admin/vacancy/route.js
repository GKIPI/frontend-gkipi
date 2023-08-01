// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../lib/db";
import VacancyModel from "../../../../../models/vacancyModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        // Connect to the database
        await startDb();

        // Fetch data from the Mongoose model and send the response
        const vacancies = await VacancyModel.find().sort({ createdAt: 'desc' });
        return NextResponse.json({ vacancies }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}
