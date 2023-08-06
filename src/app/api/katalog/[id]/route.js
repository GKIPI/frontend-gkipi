// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../lib/db";
import KatalogModel from "../../../../../models/katalogModels";
import { NextResponse } from "next/server";

// Handler for the PUT request
// Handler for the PUT request
export async function PUT(request, params) {
    try {
        // Connect to the database
        await startDb();

        // Extract the Katalog ID from the request URL
        const { id } = await params.params;

        // Find the Katalog in the database based on the ID
        const katalogToUpdate = await KatalogModel.findById(id);

        // Check if the Katalog exists in the database
        if (!katalogToUpdate) {
            return NextResponse.json({ error: 'Katalog not found.' }, { status: 404 });
        }

        // Parse the updated Katalog data from the request body
        const updatedData = JSON.parse(await request.text());

        // Simple input data validation
        if (!updatedData || Object.keys(updatedData).length === 0) {
            return NextResponse.json({ error: 'Bad request. Request body is empty.' }, { status: 400 });
        }

        // Update the Katalog document with the new data
        if (updatedData.user) {
            katalogToUpdate.user = updatedData.user;
        }

        if (updatedData.image) {
            katalogToUpdate.image = updatedData.image;
        }

        if (updatedData.title) {
            katalogToUpdate.title = updatedData.title;
        }

        if (updatedData.prize) {
            katalogToUpdate.prize = updatedData.prize;
        }

        if (updatedData.tag) {
            katalogToUpdate.tag = updatedData.tag;
        }

        if (updatedData.approval) {
            katalogToUpdate.approval = updatedData.approval;
        }

        // Save the updated document in the Mongoose model and send the response
        const updatedKatalog = await katalogToUpdate.save();
        return NextResponse.json(updatedKatalog, { status: 200 });
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
        const katalogToDelete = await KatalogModel.findById(id);

        // Check if the vacancy exists in the database
        if (!katalogToDelete) {
            return NextResponse.json({ error: 'Katalog not found.' }, { status: 404 });
        }

        // Delete the vacancy document from the Mongoose model and send the response
        await KatalogModel.deleteOne({ _id: id });

        return NextResponse.json({ message: 'Katalog deleted successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}