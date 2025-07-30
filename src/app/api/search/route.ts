import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { query } = body;
  console.log(query);
 

  try {
    const writers = await prisma.writer.findMany({
      where: {
        OR: [{ name: { contains: query } }, { last_name: { contains: query } }],
      },
    });
    const books = await prisma.book.findMany({
      where: {
        title: {contains:query},
      },
    });

    const directors = await prisma.director.findMany({
      where: {
        OR: [{ name: { contains: query } }, { last_name: { contains: query } }],
      },
    });
    const movies = await prisma.movie.findMany({
      where: {
        title: {contains:query},
      },
    });

    console.log(query);
    

    return NextResponse.json({
      writers,
      books,
      directors,
      movies,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
