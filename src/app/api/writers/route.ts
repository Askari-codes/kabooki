import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { writer } from "@prisma/client";

export async function GET() {

  
  try {
    const writers: writer[] = await prisma.writer.findMany(
      {
        take:5,
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
