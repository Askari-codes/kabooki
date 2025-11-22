import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";




export async function GET(req:NextRequest,{params}:{params:{id:number}}) {
    const id = Number (params.id)
    

    try {
        const book = await prisma.book.findUnique({
            where:{id},
        })
        if (!book) {
            return NextResponse.json({error:'Book not found'},{status:404});
        }
        return NextResponse.json(book);
    } catch (error) { 
        console.log(error);
               
       return NextResponse.json({error:"Server error"},{status:500});
    }

    
    
}