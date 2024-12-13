import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

interface Props {
  params: { id: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  
  const id = parseInt(params.id);
  
  
  if (isNaN(id)) {
    throw new Error("wrong writer id");
  }
  try {
    const writer = await prisma.writer.findUnique({
      where: { id },
      include:{
       book:true
        
      }
    });
    return NextResponse.json(writer);
  } catch (error) {
    return NextResponse.json(error);
  }
}
