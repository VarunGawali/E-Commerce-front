import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongooseClientPromise) {
    global._mongooseClientPromise = mongoose.connect(uri, options);
  }
  clientPromise = global._mongooseClientPromise;
} else {
  clientPromise = mongoose.connect(uri, options);
}

export const db = async () => {
  try {
    await clientPromise;
    console.log("Successfully connected to database");
    return mongoose.connection.db; // Return the database instance from Mongoose
  } catch (error) {
    console.error("Failed to connect to database:", error);
    throw new Error("Database connection failed");
  }
};

export { clientPromise };

