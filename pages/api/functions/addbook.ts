// /api/functions/addbook.ts
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/generated/prisma/client";




// Turn off Next.js built-in body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Upload directory path
const uploadDir = path.join(process.cwd(), "/public/uploads");
fs.mkdirSync(uploadDir, { recursive: true });

// Helper to parse multipart/form-data
const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const form = formidable({
    multiples: false,
    keepExtensions: true,
    uploadDir,
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { fields, files } = await parseForm(req);

    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const desc = Array.isArray(fields.desc) ? fields.desc[0] : fields.desc;
    const cover = Array.isArray(files.cover) ? files.cover[0] : files.cover;

    if (!title || !desc || !cover || !cover.filepath) {
      return res.status(400).json({ error: "Missing title, description, or cover image." });
    }

    const coverUrl = `/uploads/${path.basename(cover.filepath)}`;

    // ✅ Save to Prisma DB
    const newBook = await prisma.bookinfo.create({
      data: {
        title,
        desc,
        cover: coverUrl,
      },
    });

    return res.status(200).json({
      message: "✅ Book uploaded and saved to database successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return res.status(500).json({ error: "❌ Internal server error" });
  }
}
