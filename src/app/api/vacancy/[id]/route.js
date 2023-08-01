// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../lib/db";
import VacancyModel from "../../../../../models/vacancyModels";
import { NextResponse } from "next/server";

// Handler for the PUT request
export async function PUT(request, params) {
    try {
        // Connect to the database
        await startDb();

        // Extract the vacancy ID from the request URL
        const { id } = await params.params;

        // Find the vacancy in the database based on the ID
        const vacancyToUpdate = await VacancyModel.findById(id);

        // Check if the vacancy exists in the database
        if (!vacancyToUpdate) {
            return NextResponse.json({ error: 'Vacancy not found.' }, { status: 404 });
        }

        // Parse the updated vacancy data from the request body
        const { user, image, jobTitle, company, location } = JSON.parse(await request.text());

        // Simple input data validation
        if (!user || !image || !jobTitle || !company || !location) {
            return NextResponse.json({ error: 'Bad request. Missing required fields.' }, { status: 400 });
        }

        // Update the vacancy document with the new data
        vacancyToUpdate.user = user;
        vacancyToUpdate.image = image;
        vacancyToUpdate.jobTitle = jobTitle;
        vacancyToUpdate.company = company;
        vacancyToUpdate.location = location;

        // Save the updated document in the Mongoose model and send the response
        const updatedVacancy = await vacancyToUpdate.save();
        return NextResponse.json( updatedVacancy,{ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
    }
}

export async function DELETE(request, params) {
    try {
        // Connect to the database
        await startDb();

        // Extract the vacancy ID from the request URL
        const { id } = await params.params;

        // Find the vacancy in the database based on the ID
        const vacancyToDelete = await VacancyModel.findById(id);

        // Check if the vacancy exists in the database
        if (!vacancyToDelete) {
            return NextResponse.json({ error: 'Vacancy not found.' }, { status: 404 });
        }

        // Delete the vacancy document from the Mongoose model and send the response
        await vacancyToDelete.remove();
        return NextResponse.json({ message: 'Vacancy deleted successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}