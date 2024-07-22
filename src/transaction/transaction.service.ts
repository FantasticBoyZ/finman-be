import { Injectable } from '@nestjs/common';
import { Transaction } from './interface/transaction.interface';
import { addTransaction, getTransactionData } from '../db/queries';

@Injectable()
export class TransactionsService {

  async fetchTransactions(page: number, pageSize: number) {
    try {
      const data = await getTransactionData(page, pageSize);
      return data;
    } catch (error) {
      console.error('Error fetching transaction data:', error);
      throw new Error('Failed to fetch transaction data');
    }
  }

  async addTransaction(transaction: Transaction) {
    try {
      await addTransaction(transaction);
      return {
        status: 'success',
        message: 'Transaction added successfully',
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Failed to add transaction',
        error,
      };
    }
  }
}
