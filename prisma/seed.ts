import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client.js';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const deleteBefore = async () => {
  console.log('Deleting Records');
  const UserDeleted = await prisma.user.deleteMany();
  const OrganizationDeleted = await prisma.organization.deleteMany();
  const OrganizationMemberShipsDeleted =
    await prisma.organizationMemberShip.deleteMany();
  console.log(UserDeleted, OrganizationDeleted, OrganizationMemberShipsDeleted);
  return [UserDeleted, OrganizationDeleted, OrganizationMemberShipsDeleted];
};
async function main() {
  console.log('Initializing seeding...');
  const cocky = await prisma.user.create({
    data: {
      userName: 'cocky',
      email: 'cocky@gmail.com',
      password: '123',
    },
  });
  const organization = await prisma.organization.create({
    data: {
      organizationName: 'Los perros felices',
      organizationNumber: 1,
      memberships: {
        create: [{ userId: cocky.user_id }],
      },
    },
  });
  console.log(cocky, organization);
  return [cocky, organization];
}
//deleteBefore();
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
