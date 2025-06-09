import { prisma } from "@/lib/generated/prisma/client";




// /my_nextapp/api/functions/bookinfo.ts
export async function updateBookInfo(id: number, title?: string, desc?: string, cover?: string) {
  try {
    const updatedBook = await prisma.bookinfo.update({
      where: { id },
      data: {
        title,
        desc,
        cover,
      },
    });

    return updatedBook;
  } catch (error) {
    console.error("Error updating book info:", error);
    throw error;
  }
}
