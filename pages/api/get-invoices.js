import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
  const { db } = await connectToDatabase();
  try {
    const invoiceInfo = await db
      .collection("invoiceData")
      .find()
      .limit(1000)
      .toArray();
    if (!invoiceInfo) {
      return res.status(400).json({ error: "No data found." });
    }
    return res.status(200).json({ invoiceInfo });
  } catch (error) {
    return res.status(400).json({ error });
  }
}
