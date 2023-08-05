import startDb from "../../../../lib/db";
import UserModel from "../../../../models/userModels";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        // Connect to the database
        await startDb();

        // Fetch data from the Mongoose model and send the response
        const admin = await UserModel.find({
            role: "admin"
        })
        return NextResponse.json({ admin }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}