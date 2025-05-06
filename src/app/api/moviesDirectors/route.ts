import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  try {
    const moviesDirectors = await prisma.moviesDirectors.findMany();
    console.log(moviesDirectors);
    return NextResponse.json(moviesDirectors);
    
  } catch (error) {
    NextResponse.json(error);
  }
}
