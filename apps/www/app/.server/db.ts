import { PrismaClient } from '@tipprunde/db';
import { singleton } from './singleton';

export const db = singleton('prisma', () => new PrismaClient());
