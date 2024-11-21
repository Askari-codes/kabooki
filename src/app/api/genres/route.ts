import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";



export async function GET(reques:NextRequest) {
    const geners =await prisma.genre.findMany({
        take:5
    })
    return NextResponse.json(geners)
    
}