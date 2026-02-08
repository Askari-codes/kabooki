import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { MovieWithDirector,WriterData } from "../../../../../prisma/types";

interface Props {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  const id = Number(params.id);

  if (!id) {
    throw new Error("Invalid writer ID");
  }
  try {
    const writerData: WriterData | null = await prisma.writer.findUnique({
  where: { id },
  include: {
    books: {
      include: {
        book: {
          include: {
            bookMovies: {
              include: {
                movie: {
                  include: {
                    director: { include: { movies: true } },
                  },
                },
              },
            },
          },
        },
      },
    },
    writerRelations1: { include: { writer2: true } },
  },
});
   
    if (!writerData) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const relatedWriters = [
      ...writerData.writerRelations1.map(rel => rel.writer2),
      
    ];
    const { writerRelations1, books: _, ...basicWriterFields } = writerData;
    const result = {
      ...basicWriterFields,
      relatedWriters: relatedWriters,
     books: writerData.books.map((bw) => {
    // Extract the movie data from the join table (bookMovies)
    const flattenedMovies:MovieWithDirector[] = bw.book.bookMovies.map((bm) => bm.movie);

    // Create a new book object
    return {
      id: bw.book.id,
      title: bw.book.title,
      genre:bw.book.genre,
      summary: bw.book.summary, 
      slug: bw.book.slug,
     published_at:bw.book.published_at,
      cover_url :bw.book.cover_url,
      rating:bw.book.rating,
      min_price:bw.book.min_price,
      is_the_best:bw.book.is_the_best,
      pdf_url:bw.book.pdf_url,
      movies: flattenedMovies,
    };
    
  }),
  
};
  
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(req: NextRequest, { params }: Props) {
  const id = Number(params.id);
  if (!id) {
    return NextResponse.json({ error: "Invalid writer ID" }, { status: 400 });
  }
  try {
    const body = await req.json();
    const { description } = body;

    const updatedWriter = await prisma.writer.update({
      where: { id },
      data: { description: description },
      include: {
        books: {
          include: {
            book: true,
          },
        },
      },
    });
    return NextResponse.json(updatedWriter);
  } catch (error) {
    console.error("Error updating writer:", error);
    return NextResponse.json(
      { error: "Failed to update writer" },
      { status: 500 }
    );
  }
}
