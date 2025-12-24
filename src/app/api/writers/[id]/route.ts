import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  const id = Number(params.id);

  if (!id) {
    throw new Error("Invalid writer ID");
  }
  try {
    const writerData = await prisma.writer.findUnique({
      where: { id },
      include: {
        books: {
          include: {
            book:{
              include:{bookMovies:{include:{movie:true}}}
            }
          },
        },
      },
    });
   
    if (!writerData) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const result = {
      ...writerData,
      books: writerData.books.map((bw) => ({
        ...bw.book,
        movies:bw.book.bookMovies.map((bm)=>bm.movie)
      }))
      
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
