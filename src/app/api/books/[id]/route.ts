import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { bookMovies } from "../../../../../prisma/data/Bookmovies";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        writers: {
          include: {
            writer: {
              include: {
                books: {
                  include: {
                    book: true,
                  },
                },
                writerRelations1: {
                  include: { writer2: true },
                },
              },
            },
          },
        },
        bookMovies: {
          include: {
            movie: {include:{director:true}},
          },
        },
        relatedFrom: {
          include: { relatedBook: { include: { writers: {include:{writer:true}} } } },
        },
      },
    });
    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
   const result = {
  ...book,
  // 1. Existing writer flattening
  writer: book.writers[0]?.writer
    ? {
        ...book.writers[0].writer,
        books: book.writers[0].writer.books.map((b) => b.book),
        relatedWriters: book.writers[0].writer.writerRelations1.map((r) => r.writer2),
      }
    : null,

  // 2. Movie flattening
  bookMovies: book.bookMovies.map((bm) => ({
    ...bm.movie,
    director: bm.movie.director,
  })),

  // 3. UPDATED: Related books flattening
  relatedFrom: book.relatedFrom.map((item) => {
    return {
      ...item.relatedBook,
      // Flatten the writers for each related book
      writer: item.relatedBook.writers[0]?.writer||null
    };
  }),
};
    

    //    console.log(JSON.stringify(result, null, 2));

    return NextResponse.json(result);
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
