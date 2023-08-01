// Import the necessary dependencies and the SeekerModel
import startDb from "../../../../../lib/db";
import SeekerModel from "../../../../../models/seekerModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        // Connect to the database
        await startDb();

        // Fetch data from the Mongoose model and send the response
        const seekers = await SeekerModel.find().sort({ createdAt: 'desc' });
        return NextResponse.json({ seekers }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}
