import { prisma } from "@/lib/prisma";


export async function addBook(title: string, desc: string, cover: string) {
    try {
      const newBook = await prisma.bookinfo.create({
        data: {
          title,
          desc,
          cover,
        },
      });
      return newBook;
    } catch (error) {
      console.error("Failed to add book:", error);
      throw error;
    }
  }
  