import { db } from '@/lib/db'; // Import the database connection
import Order from '@/models/Order'; // Import the Order model
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Ensure the database connection is established
        const database = await db();

        // Parse the request body
        const { orderId, name, email, city, pincode, address, country, line_items, paid } = await req.json();

        // Create a new order instance
        const newOrder = new Order({
            orderId,
            name,
            email,
            city,
            pincode,
            address,
            country,
            line_items,
            paid
        });

        // Save the new order to the database
        await newOrder.save();

        // Return a success response
        return NextResponse.json({ message: 'Order saved successfully' });
    } catch (error) {
        console.error('Error saving order:', error);
        // Return an error response
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ error: 'GET request not supported for this endpoint' }, { status: 405 });
}
