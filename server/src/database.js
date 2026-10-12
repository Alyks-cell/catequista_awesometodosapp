const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = await MongoClient.connect(uri, options);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.log(error);
    }
  }
  return client;
};