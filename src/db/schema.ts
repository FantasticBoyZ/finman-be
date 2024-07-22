import { integer, pgTable, serial, date, uuid, varchar, numeric } from 'drizzle-orm/pg-core';

// Define the user table
export const userTable = pgTable('users', {
  userId: uuid('user_id').primaryKey().defaultRandom(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  account: varchar('account', { length: 255 }).notNull(),
  birthday: date('birthday').notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  balance: numeric('balance', { precision: 20, scale: 2 }).notNull(),
});

// Define the category table
export const categoryTable = pgTable('categories', {
  categoryId: serial('category_id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  type: varchar('type', { length: 255 }).notNull(), // 'Income' or 'Expense'
});

// Define the transaction table
export const transactionTable = pgTable('transactions', {
  transactionId: uuid('transaction_id').primaryKey().defaultRandom(),
  purpose: varchar('purpose', { length: 255 }).notNull(),
  categoryId: integer('category_id').notNull().references(() => categoryTable.categoryId),
  userId: uuid('user_id').notNull().references(() => userTable.userId),
  sum: numeric('sum', { precision: 20, scale: 2 }).notNull(),
  date: date('date').notNull(),
});

export type InsertUser = typeof userTable.$inferInsert;
export type SelectUser = typeof userTable.$inferSelect;

export type InsertCategory = typeof categoryTable.$inferInsert;
export type SelectCategory = typeof categoryTable.$inferSelect;

export type InsertTransaction = typeof transactionTable.$inferInsert;
export type SelectTransaction = typeof transactionTable.$inferSelect;