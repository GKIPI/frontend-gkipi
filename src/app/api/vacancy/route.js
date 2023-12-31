// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../lib/db";
import VacancyModel from "../../../../models/vacancyModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        await startDb();

        const url = new URL(req.url, `http://${req.headers.host}`);
        const page = url.searchParams.get('page') || 1;
        const perPage = 6;

        const vacancies = await VacancyModel.find({
            approval: true
        })
            .sort({ createdAt: 'desc' })
            .skip((page - 1) * perPage) 
            .limit(perPage);

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

        const { user, image, jobTitle, company, location, notes, tag } = JSON.parse(await request.text())

        // Simple input data validation
        if (!user || !image || !jobTitle || !company || !location) {
            return NextResponse.json({ error: 'Bad request. Missing required fields.' }, { status: 400 });
        }

        // Create a new document in Mongoose model and send the response
        const vacancyData = {
            user,
            image,
            jobTitle,
            company,
            location
        }
        if (notes) {
            vacancyData.notes = notes;
        }

        if (tag) {
            vacancyData.tag = tag;
        }

        const newVacancy = await VacancyModel.create(vacancyData)

        const savedVacancy = await newVacancy.save();

        return NextResponse.json(savedVacancy, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data.' }, { status: 500 });
    }
}
