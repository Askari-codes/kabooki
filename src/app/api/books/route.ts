import {  NextRequest, NextResponse } from "next/server"
import prisma from '../../../../prisma/client'


export async function GET (req: NextRequest){
try {
    const limitParam = req.nextUrl.searchParams.get("limit")
    const take = limitParam ? Number(limitParam) : 5
    const books = await prisma.book.findMany({
        take,
        include:{
            writers:{
                include:{
                    writer:true
                }
            }
        },
    })
return NextResponse.json(books)
} catch (error) {
    return NextResponse.json(error)
}
}