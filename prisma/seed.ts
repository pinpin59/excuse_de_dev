import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

async function main() {
    const filePath = path.join(__dirname, '..', 'data', 'excuses.json');
    
    // Lire le fichier JSON
    const rawData = fs.readFileSync(filePath, 'utf-8');
    
    // Parser les données JSON
    const excusesData = JSON.parse(rawData);
    
    // Ajouter les excuses dans la base de données
    await prisma.excuse.createMany({
        data: excusesData,
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
