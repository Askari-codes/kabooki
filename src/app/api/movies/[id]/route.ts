import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { error } from "console";
import { directors } from "../../../../../prisma/data/Directors";
import { MovieWithDirector } from "../../../../../prisma/types";


export async function GET(req:NextRequest,{params}:{params:{id:string}}){
const id = Number(params.id)
try {
   
    const movie = await prisma.movie.findUnique({
        where:{id},
        include:{director:{include:{movies:true}}}
    })
    if(!movie){
        return NextResponse.json({error:'there is no such a movie'},{status:404})
    }
       
    return NextResponse.json(movie)


} catch (error) {
    NextResponse.json({error:'server error'},{status:500})
}
}