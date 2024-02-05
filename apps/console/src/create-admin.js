import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  if (process.argv.length < 4) {
    console.error('Usage: create_admin <name> <email> [<slug>]');
    return;
  }

  const users = await prisma.user.findMany();

  if (users.length > 0) {
    console.error(
      'Es sind schon User angelegt. Benutzerverwaltung geht nur über die Anwendung.',
    );
    return;
  }

  let [, , name, email, slug] = process.argv;
  slug = slug || name.toLowerCase();

  await prisma.user.create({
    data: {
      name,
      slug,
      role: 'ADMIN',
      email,
    },
  });

  console.log(`Admin User '${name}' wurde erfolgreich angelegt.`);
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
