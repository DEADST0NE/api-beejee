import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);

  await prisma.roles.create({
    data: {
      name: 'admin',
    },
  });

  await prisma.users.create({
    data: {
      id: '2853054a-e51e-4b49-ac5a-c28392902940',
      login: 'admin',
      password: '$2b$10$/jKva1ZA1zCr9BGr2e33kuoPkhvHcXzAbksP1EYslogfPgSlAdXbK',
      roles: {
        connect: {
          id: 1,
        },
      },
    },
  });

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
