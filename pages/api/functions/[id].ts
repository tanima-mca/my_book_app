
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log(`📩 API Request received for ID: ${id}`);

  if (req.method === "GET") {
    try {
      // Ensure ID is a valid number
      const bookId = Number(id);
      if (isNaN(bookId)) {
        console.error("❌ Invalid book ID:", id);
        return res.status(400).json({ error: "Invalid book ID" });
      }

      // Fetch book
      const book = await prisma.bookinfo.findUnique({
        where: { id: bookId },
      });

      if (!book) {
        console.warn(`⚠ No book found for ID: ${bookId}`);
        return res.status(404).json({ error: "Book not found" });
      }

      console.log("✅ Book found:", book);
      res.status(200).json(book);
    } catch (error) {
      console.error("❌ Database error:", error);
      res.status(500).json({ error: "Failed to fetch book" });
    }
  } else {
    console.warn(`🚫 Method not allowed: ${req.method}`);
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  // Ensure the request doesn't hang
  setTimeout(() => {
    if (!res.writableEnded) {
      console.error("🕰️ API request timed out");
      res.status(504).json({ error: "Request timed out" });
    }
  }, 5000);
}


