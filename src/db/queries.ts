import { asc, desc, eq, or, sql } from 'drizzle-orm';
import { db } from './';
import {
  InsertTransaction,
  InsertUser,
  SelectUser,
  categoryTable,
  transactionTable,
  userTable
} from './schema';

export async function createUser(data: InsertUser) {
  await db.insert(userTable).values(data);
}

export async function getUserById(id: SelectUser['userId']): Promise<
  Array<{
    userId: string;
    lastName: string;
    firstName: string;
    birthday: string;
    email: string;
  }>
> {
  return db.select().from(userTable).where(eq(userTable.userId, id));
}

// imports

export async function deleteUser(id: SelectUser['userId']) {
  await db.delete(userTable).where(eq(userTable.userId, id));
}

export async function getTransactionData(page = 1, pageSize = 10) {
  try {
    const [data, [{ count }]] = await Promise.all([
      db
        .select({
          purpose: transactionTable.purpose,
          category: categoryTable.name,
          sum: transactionTable.sum,
          date: transactionTable.date,
        })
        .from(transactionTable)
        .innerJoin(
          categoryTable,
          eq(transactionTable.categoryId, categoryTable.categoryId),
        )
        .where(
          or(
            eq(categoryTable.type, 'Expense'), 
            eq(categoryTable.type, 'Income')
          ),
        )
        .orderBy(desc(transactionTable.date))
        .limit(pageSize) 
        .offset((page - 1) * pageSize),

      db
        .select({ count: sql<number>`count(*)` })
        .from(transactionTable)
        .innerJoin(
          categoryTable,
          eq(transactionTable.categoryId, categoryTable.categoryId),
        )
        .where(
          or(
            eq(categoryTable.type, 'Expense'), 
            eq(categoryTable.type, 'Income')
          ),
        )
    ]);

    return { data, totalCount: Number(count) };
  }catch (error) {
    console.error('Error fetching transaction data in queries.ts:', error);
      throw new Error('Failed to fetch transaction data');
  }
  

}

// Add a new transaction
export async function addTransaction(input: InsertTransaction) {
  try {
    await db.insert(transactionTable).values({
      purpose: input.purpose,
      categoryId: input.categoryId,
      userId: input.userId,
      sum: input.sum,
      date: input.date,
    });

    
  } catch (error) {
    console.error('Error adding transaction:', error);
    
  }
}

// export async function getUsersWithPostsCount(
//   page = 1,
//   pageSize = 5,
// ): Promise<
//   Array<{
//     postsCount: number;
//     id: string;
//     name: string;
//     age: number;
//     email: string;
//   }>
// > {
//   return db
//     .select({
//       ...getTableColumns(userTable),
//       postsCount: count(postsTable.id),
//     })
//     .from(userTable)
//     .leftJoin(postsTable, eq(userTable.userId, postsTable.userId))
//     .groupBy(userTable.userId)
//     .orderBy(asc(userTable.userId))
//     .limit(pageSize)
//     .offset((page - 1) * pageSize);
// }
// export async function getPostsForLast24Hours(
//   page = 1,
//   pageSize = 5,
// ): Promise<
//   Array<{
//     id: number;
//     title: string;
//   }>
// > {
//   return db
//     .select({
//       id: postsTable.id,
//       title: postsTable.title,
//     })
//     .from(postsTable)
//     .where(
//       between(postsTable.createdAt, sql`now() - interval '1 day'`, sql`now()`),
//     )
//     .orderBy(asc(postsTable.title), asc(postsTable.id))
//     .limit(pageSize)
//     .offset((page - 1) * pageSize);
// }

// // imports

// export async function updatePost(
//   id: SelectPost['id'],
//   data: Partial<Omit<SelectPost, 'id'>>,
// ) {
//   await db.update(postsTable).set(data).where(eq(postsTable.id, id));
// }
