import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

interface Props{
  params:{id:string}
}

export async function GET(
  {params}:Props
) {
  const id= await params.id
   const Intid = parseInt(id);
  if (isNaN(Intid)) {
    throw new Error("wrong writer id");
  }
  try {
    const writer = await prisma.writer.findUnique({
      where: {id:Intid },
      include:{books:true}
    });
    return NextResponse.json(writer);
  } catch (error) {
    return NextResponse.json(error);
  }
}
