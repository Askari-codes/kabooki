import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function GET(req:NextRequest, props:{params: Promise<{id:string}>}) {
    const params = await props.params;
    const id = Number(params.id)
    try {
        const bookWriterInformation = await prisma.booksWriters.findFirst({
            where:{
                book_id:id
            },include:{
                writer:true
            }
        })
        // console.log(bookWriterInformation);
        
        const writer=bookWriterInformation?.writer

        return NextResponse.json(bookWriterInformation);
    } catch (error) {
        NextResponse.json(error,{status:500})
        
    }
}