// app/products/[id]/page.server.js (or .ts if using TypeScript)
import { db } from "@/lib/db";
import mongoose from "mongoose";
import ProductClient from "./ProductClient"; // Client Component

export default async function ProductPage({ params }) {
  const { id } = params;

  // Fetch the product data on the server
  const database = await db();
  const collection = database.collection('products');
  const product = await collection.findOne({ _id: new mongoose.Types.ObjectId(id) });

  if (!product) {
    return <h1>Product not found</h1>;
  }

  // Pass the fetched data to the client component
  return <ProductClient product={product} />;
}


