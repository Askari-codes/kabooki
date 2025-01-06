import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req:NextRequest){
const userFavoriteMovies = await prisma.userFavoriteMovie.findMany({
    include:{movie:true}
})
return NextResponse.json(userFavoriteMovies)
}