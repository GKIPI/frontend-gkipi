// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../lib/db";
import SeekerModel from "../../../../../models/seekerModels";
import { NextResponse } from "next/server";

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
        const updatedData = JSON.parse(await request.text());

        // Simple input data validation
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return NextResponse.json({ error: 'Bad request. Request body is empty.' }, { status: 400 });
        }

        // Update the seeker document with the new data
        if (updatedData.user) {
            seekerToUpdate.user = updatedData.user;
        }

        if (updatedData.image) {
            seekerToUpdate.image = updatedData.image;
        }

        if (updatedData.name) {
            seekerToUpdate.name = updatedData.name;
        }

        if (updatedData.age) {
            seekerToUpdate.age = updatedData.age;
        }

        if (updatedData.sex) {
            seekerToUpdate.sex = updatedData.sex;
        }

        if (updatedData.jobTitle) {
            seekerToUpdate.jobTitle = updatedData.jobTitle;
        }

        if (updatedData.skills) {
            seekerToUpdate.skills = updatedData.skills;
        }

        if (updatedData.tag) {
            seekerToUpdate.tag = updatedData.tag;
        }
    
        if (updatedData.approval) {
            seekerToUpdate.approval = updatedData.approval;
        }

        if(updatedData.approval === false){
            seekerToUpdate.approval = updatedData.approval;
        }

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
        await SeekerModel.deleteOne({ _id: id });
        return NextResponse.json({ message: 'Seeker deleted successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}