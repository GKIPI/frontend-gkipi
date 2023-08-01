// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../lib/db";
import SeekerModel from "../../../../../models/seekerModels";
import { NextResponse } from "next/server";

// Handler for the PUT request
// Handler for the PUT request
export async function PUT(request, params) {
    try {
        // Connect to the database
        await startDb();

        // Extract the Seeker ID from the request URL
        const { id } = await params.params;

        // Find the Seeker in the database based on the ID
        const seekerToUpdate = await SeekerModel.findById(id);

        // Check if the Seeker exists in the database
        if (!seekerToUpdate) {
            return NextResponse.json({ error: 'Seeker not found.' }, { status: 404 });
        }

        // Parse the updated Seeker data from the request body
        const { user, image, jobTitle, skills } = JSON.parse(await request.text());

        // Simple input data validation
        if (!user || !image || !jobTitle || !skills) {
            return NextResponse.json({ error: 'Bad request. Missing required fields.' }, { status: 400 });
        }

        // Update the Seeker document with the new data
        seekerToUpdate.user = user;
        seekerToUpdate.image = image;
        seekerToUpdate.jobTitle = jobTitle;
        seekerToUpdate.skills = skills;

        // Save the updated document in the Mongoose model and send the response
        const updatedSeeker = await seekerToUpdate.save();
        return NextResponse.json(updatedSeeker, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
    }
}

export async function DELETE(request, params) {
    try {
        // Connect to the database
        await startDb();

        // Extract the Seeker ID from the request URL
        const { id } = await params.params;

        // Find the Seeker in the database based on the ID
        const seekerToDelete = await SeekerModel.findById(id);

        // Check if the Seeker exists in the database
        if (!seekerToDelete) {
            return NextResponse.json({ error: 'Seeker not found.' }, { status: 404 });
        }

        // Delete the Seeker document from the Mongoose model and send the response
        await seekerToDelete.remove();
        return NextResponse.json({ message: 'Seeker deleted successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}