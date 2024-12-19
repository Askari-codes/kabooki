import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";




export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
    const id = parseInt(params.id)
    if(isNaN(id))
        return NextResponse.json('the id is not valid',{status:400})

    try {
        const book = await prisma.book.findUnique({
            where:{id},
            
        })
        if(!book)
            return NextResponse.json('there is no such a book')
    
        return NextResponse.json(book)
    } catch (error) {        
       return NextResponse.json(error)
    }

    
    
}