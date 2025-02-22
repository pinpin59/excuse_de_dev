import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const http_code = url.pathname.split('/').pop() as string;  // Récupérer http_code de l'URL dynamique

    // Vérifier que http_code est bien un nombre
    if (!http_code || isNaN(Number(http_code))) {
      return NextResponse.json({ error: 'Le code HTTP est invalide' }, { status: 400 });
    }

    // Rechercher l'excuse correspondant à ce http_code
    const excuse = await prisma.excuse.findMany({
      where: { http_code: parseInt(http_code) },
    });

    if (!excuse) {
      return NextResponse.json({ error: 'Excuse non trouvée' }, { status: 404 });
    }

    return NextResponse.json(excuse, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de l\'excuse' }, { status: 500 });
  }
}
