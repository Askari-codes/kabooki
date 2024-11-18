import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { Writer } from "@prisma/client";

export async function GET() {
  try {
    // Fetch writers from the database
    const writers: Writer[] = await prisma.writer.findMany();

    // Return the writers as JSON
    return NextResponse.json(writers);
  } catch (error) {
    // Return the error with an appropriate status code
    return NextResponse.json(
      { error: error},
      { status: 500 }
    );
  }
}