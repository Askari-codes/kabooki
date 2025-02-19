import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function GET(req:NextRequest,{params}:{params:{slug:string}}) {
    const slug = params.slug
    try {
        const podcast = await prisma.podcast.findUnique({
            where:{
                slug:slug
            },
            include:{
                host:true
            }
            
        })
        return NextResponse.json(podcast)
    } catch (error) {
        return NextResponse.json(error)
    }
    
}