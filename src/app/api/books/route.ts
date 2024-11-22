import {  NextResponse } from "next/server"
import prisma from '../../../../prisma/client'


export async function GET (){
try {
    const books = await prisma.book.findMany({
        take:5,
        include:{
            writer:true
        },
    })
return NextResponse.json(books)
} catch (error) {
    NextResponse.json(error)
}
}