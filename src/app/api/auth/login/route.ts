import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "../../../../../prisma/client";
import { signJwt } from "../../../../lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "email and password are required" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "invalid email or password" },
        { status: 401 }
      );
    }

    const token = await signJwt({ id: user.id, email: user.email });

    const response = NextResponse.json({
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
