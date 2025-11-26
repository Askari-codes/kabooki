import { NextRequest } from "next/server";
import prisma from "../../../../../prisma/client";




export async function GET(req:NextRequest,{params}:{params:{id:string}}){
    const id = Number(params.id)

    const response = await prisma.relatedWriters.findMany({
       where: {
        OR:[
            {writer_id_1:id},
            {writer_id_2:id}
        ]
       }
    })
     // Extracting all related writer IDs from the result
     const relatedWriterIds = response.map((relation) => {
        return relation.writer_id_1 === id ? relation.writer_id_2 : relation.writer_id_1;
    });

    // Returning the related writer IDs
    return new Response(JSON.stringify(relatedWriterIds), { status: 200 });
}