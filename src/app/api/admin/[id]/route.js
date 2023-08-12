import startDb from "../../../../../lib/db";
import UserModel from "../../../../../models/userModels";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";


export async function DELETE(request, params) {
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

        // Extract the Seeker ID from the request URL
        const { id } = await params.params;

        // Find the Seeker in the database based on the ID
        const adminToDelete = await UserModel.findById(id);

        // Check if the Seeker exists in the database
        if (!adminToDelete) {
            return NextResponse.json({ error: 'User(admin) not found.' }, { status: 404 });
        }

        // Delete the Seeker document from the Mongoose model and send the response
        await UserModel.deleteOne({ _id: id });
        return NextResponse.json({ message: 'User(admin) deleted successfully.' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete data.' }, { status: 500 });
    }
}