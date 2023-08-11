// Import the necessary dependencies and the KatalogModel
import startDb from "../../../../../../lib/db";
import KatalogModel from "../../../../../../models/katalogModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req, params) {
    try {
        // Connect to the database
        await startDb();

        const { id } = await params.params;
        // Fetch data from the Mongoose model and send the response
        const katalog = await KatalogModel.findById(id);
        return katalog ? NextResponse.json({ katalog }, { status: 200 }) : NextResponse.json({ error: 'Katalog not found.' }, { status: 404 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}
