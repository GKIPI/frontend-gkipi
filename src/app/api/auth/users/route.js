import UserModel from "../../../../../models/userModels";
import { NextResponse } from "next/server";
import startDb from "../../../../../lib/db";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    const body = await req.json();
    console.log(body);

    try {
        await startDb();
    } catch (error) {
        console.error("Error connecting to the database:", error);
        return NextResponse.json({ error: "Failed to connect to the database" }, { status: 500 });
    }

    const oldUser = await UserModel.findOne({ email: body.email });
    console.log("no old user");
    if (oldUser) {
        return NextResponse.json({ error: "email already in use!" }, { status: 422 });
    }

    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password, salt);
    const user = await UserModel.create({ ...body });

    return NextResponse.json({
        user: {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
        },
    });
};
