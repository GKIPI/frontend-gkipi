import startDb from "../../../../../../lib/db";
import ActivityModel from "../../../../../../models/actifityModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        // Connect to the database
        await startDb();
        const limit = 6;

        const activities = await ActivityModel.sort({ createdAt: 'desc' })
            .limit(limit);
        return NextResponse.json({ activities }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}