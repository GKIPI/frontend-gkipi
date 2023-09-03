import startDb from "../../../../../lib/db";
import ActivityModel from "../../../../../models/actifityModels";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({error: "not authorized"},{status: 401})
    }
    const {role} = session.user
    if (role !== "admin"){
        return NextResponse.json({error: "not authorized"},{status: 401})
    }
    try {
        // Connect to the database
        await startDb();

        // Fetch data from the Mongoose model and send the response
        const activities = await ActivityModel.sort({ createdAt: 'desc' });
        return NextResponse.json({ activities }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}

// Handler for the POST request
export async function POST(request) {
    const session = await getServerSession(authOptions)

    if(!session){
        return NextResponse.json({error: "not authorized"},{status: 401})
    }
    const {role} = session.user
    if (role !== "admin"){
        return NextResponse.json({error: "not authorized"},{status: 401})
    }
    try {
        // Connect to the database
        await startDb();

        const { user, image, title, details } = JSON.parse(await request.text());

        // Simple input data validation
        if (!user || !image || !title || !details ) {
            return NextResponse.json({ error: 'Bad request. Missing required fields.' }, { status: 400 });
        }

        // Create a new document in Mongoose model and send the response
        const activityData = {
            user,
            image,
            title,
            details,
        };

        const newActivity = await ActivityModel.create(activityData)

        const savedActivity = await newActivity.save();
        return NextResponse.json(savedActivity, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to save data.' }, { status: 500 });
    }
}
