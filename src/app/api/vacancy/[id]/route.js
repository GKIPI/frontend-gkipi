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
        const updatedData = JSON.parse(await request.text());

        // Simple input data validation
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return NextResponse.json({ error: 'Bad request. Request body is empty.' }, { status: 400 });
        }

        // Update the vacancy document with the new data
        if (updatedData.user) {
            vacancyToUpdate.user = updatedData.user;
        }

        if (updatedData.image) {
            vacancyToUpdate.image = updatedData.image;
        }

        if (updatedData.jobTitle) {
            vacancyToUpdate.jobTitle = updatedData.jobTitle;
        }

        if (updatedData.company) {
            vacancyToUpdate.company = updatedData.company;
        }

        if (updatedData.location) {
            vacancyToUpdate.location = updatedData.location;
        }

        if (updatedData.tag) {
            vacancyToUpdate.tag = updatedData.tag;
        }

        if (updatedData.approval) {
            vacancyToUpdate.approval = updatedData.approval;
        }

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
        await VacancyModel.deleteOne({ _id: id });
        
        return NextResponse.json({ message: 'Vacancy deleted successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}