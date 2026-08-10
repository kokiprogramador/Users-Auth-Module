import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }
}
