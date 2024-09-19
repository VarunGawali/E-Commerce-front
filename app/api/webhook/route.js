import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(req) {
  try {
    console.log('Webhook request received');

    const event = await req.json();
    console.log('Webhook payload:', event);

    const orderId = event.payload.payment.entity.order_id;
    const paymentStatus = event.payload.payment.entity.status;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID not found' }, { status: 400 });
    }

    // Connect to MongoDB
    const database = await db();
    const ordersCollection = database.collection('orders');

    // Update the order's paid status based on payment status
    const updateResult = await ordersCollection.updateOne(
      { orderId: orderId },
      { $set: { paid: paymentStatus === 'captured' } }
    );

    if (updateResult.matchedCount === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    console.log('Order updated successfully');
    return NextResponse.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}










