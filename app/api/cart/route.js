import { db } from '@/lib/db'; // Adjust the import path as needed
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Connect to MongoDB
    const database = await db();
    const collection = database.collection('products');

    // Parse the request body to get the product IDs
    const { ids } = await req.json();

    // Validate IDs
    if (!Array.isArray(ids) || ids.some(id => typeof id !== 'string')) {
      return NextResponse.json({ error: 'Invalid IDs' }, { status: 400 });
    }

    // Fetch the products from the collection
    const products = await collection.find({ _id: { $in: ids.map(id => new ObjectId(id)) } }).toArray();

    // Return the products as JSON
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

