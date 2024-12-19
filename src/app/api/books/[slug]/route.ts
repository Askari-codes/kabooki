import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";




export async function GET(req:NextRequest,{params}:{params:{slug:string}}) {
    const slug = params.slug
    

    try {
        const book = await prisma.book.findUnique({
            where:{slug},
            include:{
                writer:true
            }
            
        })
        return NextResponse.json(book)
    } catch (error) {        
       return NextResponse.json(error)
    }

    
    
}