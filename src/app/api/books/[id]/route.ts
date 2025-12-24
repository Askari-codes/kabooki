import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";




export async function GET(req:NextRequest,{params}:{params:{id:string}}) {
    const id = Number(params.id)
    

    try {
        const book = await prisma.book.findUnique({
            where:{id},
            include:{
                writers:{
                    include:{writer:true}
                },
                bookMovies:{
                    include:{
                        movie:true
                    }
                }
            }
            
        })
        if (!book) {
            return NextResponse.json({error:'Book not found'},{status:404});
        }
       console.log(JSON.stringify(book, null, 2));
        
        return NextResponse.json(book);
    } catch (error) { 
        console.log(error);
               
       return NextResponse.json({error:"Server error"},{status:500});
    }

    
    
}