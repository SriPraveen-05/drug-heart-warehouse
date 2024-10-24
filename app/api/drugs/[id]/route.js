import connectDB from "../../../libs/mongodb";
import Drug from "../../../models/drugModel"; // Adjust the path as needed
import { NextResponse } from "next/server";

// Get a specific drug by ID
export async function GET(req, { params }) {
    try {
        const { id } = params;
        await connectDB();
        const drug = await Drug.findById(id);
        if (!drug) {
            return NextResponse.json({ message: "Drug not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, drug }, { status: 200 });
    } catch (error) {
        console.error("Error finding drug:", error);
        return NextResponse.json({ message: "Error finding drug", error }, { status: 500 });
    }
}

// Update an existing drug
export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const data = await req.json();
        await connectDB();
        const drug = await Drug.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!drug) {
            return NextResponse.json({ message: "Drug not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, drug }, { status: 200 });
    } catch (error) {
        console.error("Error updating drug:", error);
        return NextResponse.json({ message: "Error updating drug", error }, { status: 500 });
    }
}

// Delete a drug
export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await connectDB();
        const drug = await Drug.findByIdAndDelete(id);
        if (!drug) {
            return NextResponse.json({ message: "Drug not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Successfully deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting drug:", error);
        return NextResponse.json({ message: "Error deleting drug", error }, { status: 500 });
    }
}
