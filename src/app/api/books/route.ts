import { NextRequest, NextResponse } from "next/server"
import prisma from '../../../../prisma/client'


export async function GET (req:NextRequest){
try {
    const books = await prisma.book.findMany({
        take:5
    })
return NextResponse.json(books)
} catch (error) {
    NextResponse.json(error)
}
}