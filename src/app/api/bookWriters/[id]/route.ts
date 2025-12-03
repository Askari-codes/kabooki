import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
    const id = Number(params.id)
    try {
        const bookWriterInformation = await prisma.booksWriters.findFirst({
            where:{
                book_id:id
            },include:{
                writer:true
            }
        })
        const writer=bookWriterInformation?.writer

        return NextResponse.json(writer);
    } catch (error) {
        NextResponse.json(error,{status:500})
        
    }
}