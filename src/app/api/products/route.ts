import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const result = await prisma.product.findMany({
    include: { images: true },
  });

  return NextResponse.json({ data: result });
}
