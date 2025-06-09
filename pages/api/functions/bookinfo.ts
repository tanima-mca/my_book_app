import { prisma } from "@/lib/generated/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      console.log("📡 Fetching books from MySQL...");
      const books = await prisma.bookinfo.findMany();
      console.log("✅ Books fetched:", books);
      return res.status(200).json(books);
    } catch (error) {
      console.error("❌ Error fetching books:", error);
      return res.status(500).json({ error: "Failed to fetch books" });
    }
  }
  res.setHeader("Allow", ["GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
