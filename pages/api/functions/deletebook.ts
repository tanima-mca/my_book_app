
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { id } = req.query;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    try {
      await prisma.bookinfo.delete({
        where: {
          id: Number(id), // Ensure it's a number
        },
      });

      return res.status(200).json({ message: "✅ Book deleted successfully" });
    } catch (error) {
      console.error("❌ Delete failed:", error);
      return res.status(500).json({ message: "❌ Failed to delete book" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
