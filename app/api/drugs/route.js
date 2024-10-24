import connectDB from "../../libs/mongodb";
import Drug from "../../models/drugModel"; // Adjust the path as needed
import { NextResponse } from "next/server";

// Get all drugs
export async function GET() {
    try {
        await connectDB();
        const drugs = await Drug.find();
        return NextResponse.json({ success: true, drugs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching drugs:", error);
        return NextResponse.json({ message: "Error fetching drugs", error }, { status: 500 });
    }
}

// Create a new drug
export async function POST(req) {
    try {
        const drugData = await req.json();
        await connectDB();
        const drug = await Drug.create(drugData);
        return NextResponse.json({ success: true, drug }, { status: 201 });
    } catch (error) {
        console.error("Error creating drug:", error);
        return NextResponse.json({ message: "Error creating drug", error }, { status: 500 });
    }
}
