// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../lib/db";
import KatalogModel from "../../../../../models/katalogModels";
import { NextResponse } from "next/server";

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
        const { user, image, title, prize } = JSON.parse(await request.text());

        // Simple input data validation
        if (!user || !image || !title || !prize) {
            return NextResponse.json({ error: 'Bad request. Missing required fields.' }, { status: 400 });
        }

        // Update the Katalog document with the new data
        katalogToUpdate.user = user;
        katalogToUpdate.image = image;
        katalogToUpdate.title = title;
        katalogToUpdate.prize = prize;

        // Save the updated document in the Mongoose model and send the response
        const updatedKatalog = await katalogToUpdate.save();
        return NextResponse.json( updatedKatalog,{ status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update data.' }, { status: 500 });
    }
}

export async function DELETE(request, params) {
    try {
        // Connect to the database
        await startDb();

        // Extract the Katalog ID from the request URL
        const { id } = await params.params;

        // Find the Katalog in the database based on the ID
        const KatalogToDelete = await KatalogModel.findById(id);

        // Check if the Katalog exists in the database
        if (!KatalogToDelete) {
            return NextResponse.json({ error: 'Katalog not found.' }, { status: 404 });
        }

        // Delete the Katalog document from the Mongoose model and send the response
        await KatalogToDelete.remove();
        return NextResponse.json({ message: 'Katalog deleted successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}