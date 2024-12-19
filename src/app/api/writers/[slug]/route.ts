import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

interface Props {
  params: { slug: string };
}

export async function GET(req: NextRequest, { params }: Props) {
  
  const slug = params.slug
  
  
  if (!slug) {
    throw new Error("wrong writer id");
  }
  try {
    const writer = await prisma.writer.findUnique({
      where: { slug },
      include:{
       books:true
        
      }
    });
    return NextResponse.json(writer);
  } catch (error) {
    return NextResponse.json(error);
  }
}
