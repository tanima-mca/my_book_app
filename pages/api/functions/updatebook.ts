// import prisma from "@/lib/prisma";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "PUT") {
//     const { id, title, desc, cover } = req.body;

//     console.log(`🔄 Updating book ID: ${id} with data:`, { title, desc, cover });

//     if (!id) return res.status(400).json({ error: "Book ID is required" });

//     try {
//       const updatedBook = await prisma.bookinfo.update({
//         where: { id: Number(id) },
//         data: { title, desc, cover },
//       });

//       console.log("✅ Book updated successfully:", updatedBook);
//       res.status(200).json(updatedBook);
//     } catch (error) {
//       console.error("❌ Failed to update book:", error);
//       res.status(500).json({ error: "Failed to update book" });
//     }
//   } else {
//     res.setHeader("Allow", ["PUT"]);
//     res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }




// pages/api/functions/updatebook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import path from 'path';
import fs from 'fs';
import { prisma } from '@/lib/prisma';


// Disable default Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure the upload directory exists
const uploadDir = path.join(process.cwd(), 'public/uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Main API handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    multiples: false,
    filename: (_name, _ext, part) => {
      const ext = path.extname(part.originalFilename || '');
      const name = path.basename(part.originalFilename || 'upload', ext);
      return `${name}-${Date.now()}${ext}`;
    },
  });

  const parseForm = (): Promise<{ fields: Fields; files: Files }> =>
    new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

  try {
    const { fields, files } = await parseForm();

    const id = Array.isArray(fields.id) ? fields.id[0] : fields.id;
    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const desc = Array.isArray(fields.desc) ? fields.desc[0] : fields.desc;

    const file = Array.isArray(files.cover) ? files.cover[0] : files.cover;

    if (!id || !title || !desc || !file) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const imagePath = `/uploads/images/${file.newFilename}`;

    const updatedBook = await prisma.bookinfo.update({
      where: { id: Number(id) },
      data: {
        title,
        desc,
        cover: imagePath,
      },
    });

    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error('❌ Error updating book:', error);
    return res.status(500).json({ message: 'Internal server error'});
  }
}
