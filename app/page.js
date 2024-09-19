
import Header from "@/components/Header";
import RootLayout from "./layout";
import Featured from "@/components/Featured";
import { db } from "@/lib/db";
import { ObjectId } from "mongodb";
import NewProducts from "@/components/NewProducts";

export default async function HomePage(){

  let featuredProduct = null;
  let newProducts

  try {
    const database = await db();
    const collection = database.collection('products');

    // Fetch Featured Product
    const featuredProductId = "6697f1d8c992b0b2daed82e5";
    const featuredProductDoc = await collection.findOne({ _id: new ObjectId(featuredProductId) });

    if (featuredProductDoc) {
      featuredProduct = {
        ...featuredProductDoc,
        _id: featuredProductDoc._id.toString(),
        category: featuredProductDoc.category ? featuredProductDoc.category.toString() : null,
      };
    } else {
      console.error(`Featured product with ID ${featuredProductId} not found.`);
    }

    // Fetch New Products
    newProducts = await collection.find({}, { sort: { '_id': -1 }, limit: 10 }).toArray();
  } catch (error) {
    console.error("Error fetching data:", error);
  }


  return(
    <RootLayout>
      <Header/>
     <Featured featuredProduct={featuredProduct}/>
     <NewProducts products={newProducts}/>
    </RootLayout>
  )
}

