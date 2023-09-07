// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../../lib/db";
import ActivityModel from "../../../../../../models/activityModels";
import { NextResponse } from "next/server";

// Handler for the PUT request
export async function PUT(request, params) {
    try {
        // Connect to the database
        await startDb();

        // Extract the Activity ID from the request URL
        const { id } = await params.params;

        // Find the Activity in the database based on the ID
        const activityToUpdate = await ActivityModel.findById(id);

        // Check if the Activity exists in the database
        if (!activityToUpdate) {
            return NextResponse.json({ error: 'Activity not found.' }, { status: 404 });
        }

        // Parse the updated Activity data from the request body
        const updatedData = JSON.parse(await request.text());

        // Simple input data validation
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return NextResponse.json({ error: 'Bad request. Request body is empty.' }, { status: 400 });
        }

        // Update the activity document with the new data
        if (updatedData.user) {
            activityToUpdate.user = updatedData.user;
        }

        if (updatedData.image) {
            activityToUpdate.image = updatedData.image;
        }

        if (updatedData.title) {
            activityToUpdate.title = updatedData.title;
        }

        if (updatedData.details) {
            activityToUpdate.details = updatedData.details;
        }
        
        // Save the updated document in the Mongoose model and send the response
        const updatedActivity = await activityToUpdate.save();
        return NextResponse.json(updatedActivity, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
    }
}

export async function DELETE(request, params) {
    try {
        // Connect to the database
        await startDb();

        // Extract the Activity ID from the request URL
        const { id } = await params.params;

        // Find the Activity in the database based on the ID
        const activityToDelete = await ActivityModel.findById(id);

        // Check if the Activity exists in the database
        if (!activityToDelete) {
            return NextResponse.json({ error: 'Activity not found.' }, { status: 404 });
        }

        // Delete the Activity document from the Mongoose model and send the response
        await ActivityModel.deleteOne({ _id: id });

        return NextResponse.json({ message: 'Activity deleted successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}