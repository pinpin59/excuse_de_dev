import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1'); 
    const rowsPerPage = 15;
    const skip = (page - 1) * rowsPerPage;

    const getAllData = url.searchParams.has('all') && url.searchParams.get('all') === 'true';
    if (getAllData) {
      // Récupérer toutes les données sans pagination
      const excuses = await prisma.excuse.findMany();
      return NextResponse.json({
        data: excuses,
      }, { status: 200 });
    } else {
      // Récupérer avec pagination
      const excuses = await prisma.excuse.findMany({
        skip,
        take: rowsPerPage,
      });

      const totalExcuses = await prisma.excuse.count();
      const totalPages = Math.ceil(totalExcuses / rowsPerPage);

      return NextResponse.json({
        data: excuses,
        pagination: {
          currentPage: page,
          totalPages,
          totalExcuses,
        },
      }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching excuses' + error }, { status: 500 });
  }
}
