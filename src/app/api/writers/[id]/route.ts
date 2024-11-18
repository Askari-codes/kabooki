import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id);
  if (isNaN(id)) {
    throw new Error("wrong writer id");
  }
  try {
    const writer = await prisma.writer.findUnique({
      where: { id },
    });
    return NextResponse.json(writer);
  } catch (error) {
    return NextResponse.json(error);
  }
}
