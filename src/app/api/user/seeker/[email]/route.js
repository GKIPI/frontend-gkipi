// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../../../lib/db";
import SeekerModel from "../../../../../../models/seekerModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(request, params) {
    const {email} = params.params
    try {
        // Connect to the database
        await startDb();

        // Fetch data from the Mongoose model with the specified conditions
        const seekers = await SeekerModel.find({
            user: email
        }).sort({ createdAt: 'desc' });

        return NextResponse.json({ seekers }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}

