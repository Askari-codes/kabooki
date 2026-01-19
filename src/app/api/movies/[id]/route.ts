import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { error } from "console";
import { directors } from "../../../../../prisma/data/Directors";
import { MovieWithDirectors } from "../../../../../prisma/types";


export async function GET(req:NextRequest,{params}:{params:{id:string}}){
const id = Number(params.id)
try {
   
    const movie = await prisma.movie.findUnique({
        where:{id},
        include:{directors:{include:{director:{include:{movies:{include:{movie:true}}}}}}
            
        }
    })
    if(!movie){
        return NextResponse.json({error:'there is no such a movie'},{status:404})
    }
        const flattenedMovie:MovieWithDirectors ={
            ...movie,
           directors:{
            ...movie.directors[0].director,
            movies:movie.directors[0].director.movies.map((m)=>m.movie
        )
           }
        }
        
    return NextResponse.json(flattenedMovie)


} catch (error) {
    NextResponse.json({error:'server error'},{status:500})
}
}