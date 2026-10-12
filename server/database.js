require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

const options = {
  serverSelectionTimeoutMS: 8000,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client;
const connectToMongoDB = async () => {
  if (!client) {
    if (process.env.VERCEL && !process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not set");
    }
    try {
      client = await MongoClient.connect(uri, options);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };