// app/products/page.js
import { db } from "@/lib/db";
import ProductsClient from "./ProductsClient";

// Server-side component
export default async function ProductsPage() {
  const database = await db();
  const collection = database.collection('products');
  const allProducts = await collection.find({}).sort({ _id: -1 }).toArray();

  return (
    <ProductsClient products={allProducts} />
  );
}
