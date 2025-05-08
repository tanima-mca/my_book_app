// // /pages/api/addBook.ts
// import { NextApiRequest, NextApiResponse } from "next";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "POST") {
//     const { title, desc, cover } = req.body;

//     if (!title || !desc || !cover) {
//       return res.status(400).json({ error: "❌ All fields are required!" });
//     }

//     try {
//       const newBook = await prisma.bookinfo.create({
//         data: { title, desc, cover },
//       });

//       return res.status(201).json(newBook);
//     } catch (error) {
//       console.error("❌ Error adding book:", error);
//       return res.status(500).json({ error: "Failed to add book!" });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     return res.status(405).json({ error: `Method ${req.method} not allowed` });
//   }
// }

// pages/api/book/upload.ts

import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/prisma';


// Disable the default Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), '/public/uploads/images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Main handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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

    const title = Array.isArray(fields.title) ? fields.title[0] : fields.title;
    const desc = Array.isArray(fields.desc) ? fields.desc[0] : fields.desc;

    const coverFile = files.cover;
    const file = Array.isArray(coverFile) ? coverFile[0] : coverFile;

    if (!title || !desc || !file) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const imagePath = `/uploads/images/${file.newFilename}`;

    const newBook = await prisma.bookinfo.create({
      data: {
        title,
        desc,
        cover: imagePath,
      },
    });

    return res.status(201).json({ message: '✅ Book added successfully', book: newBook });
  } catch (error) {
    console.error('❌ Error handling form:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}
