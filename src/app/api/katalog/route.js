// Import the necessary dependencies and the VacanciesModel
import startDb from "../../../../lib/db";
import KatalogModel from "../../../../models/katalogModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        // Connect to the database
        await startDb();

        // Fetch data from the Mongoose model and send the response
        const katalogs = await KatalogModel.find({
            approval: true
        }).sort({ createdAt: 'desc' });
        return NextResponse.json({ katalogs }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to fetch data.' }, { status: 500 });
    }
}

// Handler for the POST request
export async function POST(request) {
    try {

        // Connect to the database
        await startDb();

        const { user, image, title, prize, tag } = JSON.parse(await request.text())

        // Simple input data validation
        if (!user || !image || !title || !prize) {
            return NextResponse.json({ error: 'Bad request. Missing required fields.' }, { status: 400 });
        }

        let newKatalog

        if(!tag){
            newKatalog = await KatalogModel.create({ user, image, title, prize });
        }
        else{
            newKatalog = await KatalogModel.create({ user, image, title, prize, tag });
        }

        const savedKatalog = await newKatalog.save();
        return NextResponse.json(savedKatalog, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data.' }, { status: 500 });
    }
}
