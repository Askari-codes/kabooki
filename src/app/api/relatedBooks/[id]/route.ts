import prisma from "../../../../../prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  try {
    const rows = await prisma.relatedBook.findMany({
      where: { bookId: id },
      include: { relatedBook: true },
    });

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "There is no related book" },
        { status: 404 }
      );
    }

 
    const relatedBooks = rows.map(row => row.relatedBook);

    return NextResponse.json(relatedBooks);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}