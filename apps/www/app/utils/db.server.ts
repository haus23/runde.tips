import { PrismaClient } from '@tipprunde/db';
import { singleton } from '@tipprunde/utils';

export const db = singleton('prisma', () => new PrismaClient());
