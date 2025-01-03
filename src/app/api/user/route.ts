import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";




export async function GET(req:NextRequest){
const user = await prisma.userFavoriteBook.findMany({
    include:{book:true}
})
return NextResponse.json(user)
}