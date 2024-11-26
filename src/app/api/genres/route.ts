import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";



export async function GET() {
 try {
    const geners =await prisma.genre.findMany({
        take:5
    })
    return NextResponse.json(geners)
 } catch (error) {
    return NextResponse.json(error)
 }
    
}