import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const movies = await prisma.movie.findMany(
        
    );

    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
