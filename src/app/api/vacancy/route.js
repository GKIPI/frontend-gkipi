// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../lib/db";
import VacancyModel from "../../../../models/vacancyModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        // Connect to the database
        await startDb();

        // Fetch data from the Mongoose model and send the response
        const vacancies = await VacancyModel.find({
            approval: true
        }).sort({ createdAt: 'desc' });
        return NextResponse.json({ vacancies }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}

// Handler for the POST request
export async function POST(request) {
    try {

        // Connect to the database
        await startDb();

        const { user, image, jobTitle, company, location } = JSON.parse(await request.text())

        // Simple input data validation
        if (!user || !image || !jobTitle || !company || !location) {
            return NextResponse.json({ error: 'Bad request. Missing required fields.' }, { status: 400 });
        }

        // Create a new document in Mongoose model and send the response
        const newVacancy = await VacancyModel.create({ user, image, jobTitle, company, location });

        const savedVacancy = await newVacancy.save();
        return NextResponse.json(savedVacancy, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data.' }, { status: 500 });
    }
}
