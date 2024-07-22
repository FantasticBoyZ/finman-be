export interface Transaction {
  transactionId: string;
  purpose: string;
  categoryId: number;
  userId: string;
  sum: string;
  date: string; // Use string type to represent date in 'YYYY-MM-DD' format
}
