// Import the necessary dependencies and the SeekerModel
import startDb from "../../../../lib/db";
import SeekerModel from "../../../../models/seekerModels";
import { NextResponse } from "next/server";

// Handler for the GET request
export async function GET(req) {
    try {
        // Connect to the database
        await startDb();

        const url = new URL(req.url, `http://${req.headers.host}`);
        const page = url.searchParams.get('page') || 1;
        const perPage = 6;

        const seekers = await SeekerModel.find({
            approval: true
        })
            .sort({ createdAt: 'desc' })
            .skip((page - 1) * perPage)
            .limit(perPage);
        return NextResponse.json({ seekers }, { status: 200 });
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

        const { user, image, jobTitle, skills, tag, name, sex, education, age } = JSON.parse(await request.text());

        // Simple input data validation
        if (!user || !image || !jobTitle || !skills || !name || !sex || !education || !age) {
            return NextResponse.json({ error: 'Bad request. Missing required fields.' }, { status: 400 });
        }

        // Create a new document in Mongoose model and send the response
        const seekerData = {
            user,
            image,
            jobTitle,
            skills,
            name,
            sex,
            education,
            age
        };

        if (tag) {
            seekerData.tag = tag;
        }
        if (skills) {
            seekerData.skills = skills
        }
        const newSeeker = await SeekerModel.create(seekerData)

        const savedSeeker = await newSeeker.save();
        return NextResponse.json(savedSeeker, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to save data.' }, { status: 500 });
    }
}
