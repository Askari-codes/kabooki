import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const bookId = Number(params.id);
  try {
    const bookMovies = await prisma.bookMovies.findMany({
      where: {
        book_id: bookId,
      },
      include: {
        movie: true,
        
      },
      
    });

    const movies = bookMovies.map((item)=>{
      return item.movie
    })

    

    return NextResponse.json(movies);
  } catch (error) {
    console.error("Error fetching related movies:", error);
    return NextResponse.json(error);
  }
}
