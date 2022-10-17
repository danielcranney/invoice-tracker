import { MongoClient } from "mongodb";

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let promise = null;
let cached = null;

if (!uri) throw new Error("Missing environment variable MONGO_URI");
if (!dbName) throw new Error("Missing environment variable MONGO_DB");

export async function connectToDatabase() {
  if (cached) return cached;
  if (!promise) {
    promise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const client = await promise;
  const db = await client.db(dbName);
  cached = {
    client,
    db,
  };
  return cached;
}
