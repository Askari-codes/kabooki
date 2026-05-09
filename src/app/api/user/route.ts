import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function GET(req: NextRequest) {
  const user = await prisma.userFavoriteBook.findMany({
    include: { book: true },
  });
  return NextResponse.json(user);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, username, email, password, avatar, bio, location } = body;

  if (!name || !username || !email || !password) {
    return NextResponse.json({ error: "name, username, email, and password are required" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: { name, username, email, password, avatar, bio, location },
    });

    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (err: any) {
    if (err?.code === "P2002") {
      const field = err.meta?.target?.[0] ?? "field";
      return NextResponse.json({ error: `${field} is already taken` }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}