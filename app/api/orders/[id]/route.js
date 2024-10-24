import connectDB from "../../../libs/mongodb";
import Order from "../../../models/orderModel"; // Adjust the path as needed
import { NextResponse } from "next/server";

// Get a specific order by ID
export async function GET(req, { params }) {
    try {
        const { id } = params;
        await connectDB();
        const order = await Order.findById(id).populate('drugId'); // Populate drugId if needed
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, order }, { status: 200 });
    } catch (error) {
        console.error("Error finding order:", error);
        return NextResponse.json({ message: "Error finding order", error }, { status: 500 });
    }
}

// Update an existing order
export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const data = await req.json();
        await connectDB();
        const order = await Order.findByIdAndUpdate(id, data, { new: true, runValidators: true });
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, order }, { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Error updating order", error }, { status: 500 });
    }
}

// Delete an order
export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        await connectDB();
        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Successfully deleted" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting order:", error);
        return NextResponse.json({ message: "Error deleting order", error }, { status: 500 });
    }
}


// Update transport history and status of an existing order
export async function PATCH(req, { params }) {
    try {
        const { id } = params; // The order ID
        const { status, transportHistory } = await req.json(); // Destructuring the JSON payload
        await connectDB();
        
        // Find the order by ID
        const order = await Order.findById(id);
        if (!order) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 });
        }

        // Update the status if provided
        if (status) {
            order.status = status;
        }

        // Update the transport history if provided
        if (transportHistory) {
            order.transportHistory.push(...transportHistory); // Append new history entries
        }

        // Save the updated order
        await order.save();

        return NextResponse.json({ success: true, order }, { status: 200 });
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ message: "Error updating order", error }, { status: 500 });
    }
}
