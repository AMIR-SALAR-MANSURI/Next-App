import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
import { use } from "react";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (!body.name)
    return NextResponse.json({ error: "name is required" }, { status: 400 });
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  const updateUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(updateUser);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });
  // const body = await request.json();
  // if (!body.name)
  //   return NextResponse.json({ error: "name is required" }, { status: 400 });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  prisma.user.delete({
    where: {
      id: user.id,
    },
  });
  return NextResponse.json({});
}
