import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { verifyJwt } from "../../../../lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "not authenticated" }, { status: 401 });
  }

  const payload = await verifyJwt(token);

  if (!payload) {
    return NextResponse.json({ error: "invalid or expired token" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      avatar: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
