import startDb from "../../../../lib/db";
import UserModel from "../../../../models/userModels";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
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
        const admin = await UserModel.find({
            role: "admin"
        })
        return NextResponse.json({ admin }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}