import exp from "constants";
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET() {
  const product = await prisma.product.findMany();
  return NextResponse.json(product);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = schema.safeParse(body);
  if (!validate.success) return NextResponse.json(validate.error.errors);
  const product = await prisma.product.create({
    data: {
      name: body.name,
      price: body.price,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
