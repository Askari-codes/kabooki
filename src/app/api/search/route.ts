import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(req:NextRequest) {
    const body = await req.json()
    const {query}=body
    console.log(query);
    // return NextResponse.json({ query })
    
  try {
    const writers = await prisma.writer.findMany({
        where:{
            OR:[
                {name:{contains:query}},
                {last_name:{contains:query}}
            ]
        }
    });
    const moviesDirectors = await prisma.director.findMany({
        where:{
            OR:[
                {name:{contains:query,}},
                {last_name:{contains:query}}
            ]
        },
        
    });
   
    // console.log(moviesDirectors);
    

    return NextResponse.json({
      moviesDirectors,
      writers
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}