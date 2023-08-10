// Import the necessary dependencies and the SeekerModel
import startDb from "../../../../../../lib/db";
import SeekerModel from "../../../../../../models/seekerModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req, params) {
    try {
        // Connect to the database
        await startDb();

        const { id } = await params.params;
        // Fetch data from the Mongoose model and send the response
        const seeker = await SeekerModel.findById(id);
        return seeker ? NextResponse.json({ seeker }, { status: 200 }) : NextResponse.json({ error: 'Seeker not found.' }, { status: 404 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}
