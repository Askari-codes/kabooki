import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";




export async function GET(req:NextRequest) {
    try {
        const response = await prisma.podcast.findMany({
            include:{host:true}
            
        })
        return NextResponse.json(response)
    } catch (error) {
        NextResponse.json(error)
    }

}