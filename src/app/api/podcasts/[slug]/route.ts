import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";


export async function GET(req:NextRequest, props:{params: Promise<{slug:string}>}) {
    const params = await props.params;
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