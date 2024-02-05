import { PrismaClient } from '@prisma/client';

const legacyBaseUrl = 'https://backend.runde.tips/api/v1';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();

  if (users.length > 0) {
    console.error(
      'Es sind schon User angelegt. Benutzerverwaltung geht nur über die Anwendung.',
    );
    return;
  }

  const resourceUrl = `${legacyBaseUrl}/accounts`;

  const response = await fetch(resourceUrl);
  const data = await response.json();

  let count = 0;

  for (const acc of data) {
    ++count;
    await prisma.user.create({
      data: {
        name: acc.name,
        slug: acc.id,
        email: acc.email || null,
        role: acc.role || 'PLAYER',
      },
    });
  }

  console.log(`Erfolgreiches Einfügen von ${count} Spielern.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
