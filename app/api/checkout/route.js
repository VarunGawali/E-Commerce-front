import { db } from '@/lib/db'; // Adjust the import path as needed
import { ObjectId } from 'mongodb';
import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(req) {
  try {
    // Connect to MongoDB
    const database = await db();
    const ordersCollection = database.collection('orders');
    const productsCollection = database.collection('products');

    // Parse the request body to get the product IDs
    const { name, email, city, pincode, address, country, products } = await req.json();

    // Ensure products is a valid string
    if (typeof products !== 'string') {
      throw new Error('Invalid products format');
    }

    const productIdsArray = products.split(',').map(id => id.trim());
    const uniqueIds = [...new Set(productIdsArray)];

    // Validate IDs
    if (!Array.isArray(uniqueIds) || uniqueIds.some(id => typeof id !== 'string')) {
      return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
    }

    // Fetch the products from the collection
    const productsInfos = await productsCollection.find({ _id: { $in: uniqueIds.map(id => new ObjectId(id)) } }).toArray();

    let line_items = [];
    for (const productId of uniqueIds) {
      const info = productsInfos.find(p => p._id.toString() === productId);
      const quantity = productIdsArray.filter(id => id === productId).length || 0;
      if (quantity > 0 && info) {
        const lineItem = {
          title: info.title,
          description: info.description,
          price: info.price,
          images: info.images,
          category: info.category,
          quantity,
          price_data: {
            currency: 'INR',
            product_data: { name: info.title },
            unit_amount: info.price * 100 , // Convert price to smallest unit (e.g., paise)
          },
        };
        line_items.push(lineItem);
      }
    }

    if (line_items.length === 0) {
      return NextResponse.json({ error: 'No valid line items found' }, { status: 400 });
    }

    const amount = line_items.reduce((total, item) => total + (item.price_data.unit_amount * item.quantity), 0);

    // Create an order in Razorpay
    const options = {
      amount, // This should already be in the smallest unit
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    if (!order) {
      throw new Error('Razorpay order creation failed');
    }

    // Create an order document in your database
    const orderDoc = {
      line_items,
      name,
      email,
      city,
      pincode,
      address,
      country,
      paid: false,
      orderId: order.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await ordersCollection.insertOne(orderDoc);

    // Return the order details including the Razorpay order ID
    return NextResponse.json({ message: 'Checkout successful', orderId: order.id, order: orderDoc });
  } catch (error) {
    console.error('Error processing checkout:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'GET request not supported for this endpoint' }, { status: 405 });
}








