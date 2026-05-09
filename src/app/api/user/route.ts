import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";



export async function GET(req: NextRequest) {
  const user = await prisma.userFavoriteBook.findMany({
    include: { book: true },
  });
  return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, username, email, password, avatar, bio, location } = body;

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "name, username, email, and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.create({
      data: { name, username, email, password, avatar, bio, location },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        avatar: true,
        bio: true,
        location: true,
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    if (error.code === "P2002") {
      const field = error.meta?.target?.[0] ?? "field";
      return NextResponse.json(
        { error: `${field} already exists` },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}