import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req:NextRequest){
const userFavoriteBooks = await prisma.userFavoriteBook.findMany({
    include:{book:true}
})
return NextResponse.json(userFavoriteBooks)
}