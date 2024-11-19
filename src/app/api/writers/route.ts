import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { Writer } from "@prisma/client";

export async function GET() {
  try {
    const writers: Writer[] = await prisma.writer.findMany(
      {
        include:{
          books:true
        }
      }
    );
    return NextResponse.json(writers);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
