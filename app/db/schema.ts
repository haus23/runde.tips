import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp().defaultNow(),
  updatedAt: timestamp().$onUpdate(() => new Date()),
};

export const roleEnum = pgEnum('role', ['USER', 'ADMIN']);

export const users = pgTable('user', {
  id: serial().primaryKey(),
  name: text().notNull(),
  slug: text().unique().notNull(),
  email: text().unique(),
  role: roleEnum().notNull().default('USER'),
  ...timestamps,
});

export const sessions = pgTable('session', {
  id: uuid().primaryKey().defaultRandom(),
  userId: integer().notNull(),
  expires: boolean().notNull(),
  expiresAt: timestamp().notNull(),
  ...timestamps,
});

export const verifications = pgTable('verification', {
  id: uuid().primaryKey().defaultRandom(),
  email: text().notNull().unique(),
  secret: text().notNull(),
  algorithm: text().notNull(),
  digits: integer().notNull(),
  period: integer().notNull(),
  charSet: text().notNull(),
  attempts: integer().notNull().default(0),
  expiresAt: timestamp().notNull(),
  ...timestamps,
});
