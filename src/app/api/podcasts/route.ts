import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";



export async function GET() {
    try {
        const podcasts = await prisma.podcast.findMany({
            take:5,
            include:{
                host:true
            }
        })
        return NextResponse.json(podcasts)
    } catch (error) {
        NextResponse.json(error)
    }
}