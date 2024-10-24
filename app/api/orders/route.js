import connectDB from "../../libs/mongodb";
import Order from "../../models/orderModel"; // Adjust the path as needed
import { NextResponse } from "next/server";

// Get all orders
export async function GET() {
    try {
        await connectDB();
        const orders = await Order.find().populate('drugId'); // Optionally populate drugId if needed
        return NextResponse.json({ success: true, orders }, { status: 200 });
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ message: "Error fetching orders", error }, { status: 500 });
    }
}

// Create a new order
export async function POST(req) {
    try {
        const orderData = await req.json();
        await connectDB();
        const order = await Order.create(orderData);
        return NextResponse.json({ success: true, order }, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ message: "Error creating order", error }, { status: 500 });
    }
}
