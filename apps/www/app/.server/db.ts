import { PrismaClient } from '@prisma/client';
import { singleton } from './singleton';

export const db = singleton('prisma', () => new PrismaClient());
