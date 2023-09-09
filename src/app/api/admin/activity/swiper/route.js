import startDb from "../../../../../../lib/db";
import ActivityModel from "../../../../../../models/activityModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        await startDb();
        const limit = 6;
//fix: return image and title only
        const activities = await ActivityModel.find().sort({ createdAt: 'desc' }).limit(limit).select('image title _id');
        ;
        return NextResponse.json({ activities }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}